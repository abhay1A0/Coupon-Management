import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dummy API endpoints
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Using a public mock API for now

const CouponManagementPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', expiryDate: '', description: '' });
  const [editingCoupon, setEditingCoupon] = useState(null); // For edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false); // To toggle display of deleted coupons

  // Fetch coupons (dummy)
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${API_URL}?_limit=5`); // Still fetch to get unique IDs
        const goodDescriptions = [
          "Get 10% off your next purchase of electronics.",
          "Free shipping on all orders over $50.",
          "Save $5 on any book in the fiction category.",
          "20% discount on all summer apparel.",
          "Buy one get one free on selected drinks."
        ];
        const fetchedCoupons = response.data.map((post, index) => ({
          id: post.id, // Use API's ID for uniqueness
          code: `DEAL${(index + 1) * 10}`, // Create slightly different codes
          expiryDate: new Date(Date.now() + ((index + 1) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          description: goodDescriptions[index] || "Special offer, enjoy!", // Use our good descriptions
          isDeleted: false,
        }));
        setCoupons(fetchedCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCoupon({ ...editingCoupon, [name]: value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.expiryDate || !newCoupon.description) {
      alert("Please fill in all fields for the new coupon.");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        title: newCoupon.description,
        body: newCoupon.code,
        userId: 1,
      });
      const addedCoupon = {
        id: response.data.id || Date.now(),
        code: newCoupon.code,
        expiryDate: newCoupon.expiryDate,
        description: newCoupon.description,
        isDeleted: false,
      };
      setCoupons([...coupons, addedCoupon]);
      setNewCoupon({ code: '', expiryDate: '', description: '' });
      setShowAddForm(false);
      alert("Coupon added successfully!");
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert("Failed to add coupon.");
    }
  };

  const openEditModal = (coupon) => {
    setEditingCoupon({ ...coupon });
    setShowEditModal(true);
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    if (!editingCoupon || !editingCoupon.code || !editingCoupon.expiryDate || !editingCoupon.description) {
      alert("Please fill in all fields for the coupon update.");
      return;
    }
    try {
      await axios.put(`${API_URL}/${editingCoupon.id}`, {
        id: editingCoupon.id,
        title: editingCoupon.description,
        body: editingCoupon.code,
        userId: 1,
      });
      setCoupons(coupons.map(c => (c.id === editingCoupon.id ? editingCoupon : c)));
      setShowEditModal(false);
      setEditingCoupon(null);
      alert("Coupon updated successfully!");
    } catch (error) {
      console.error("Error updating coupon:", error);
      alert("Failed to update coupon.");
    }
  };

  const openDeleteConfirm = (coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteConfirm(true);
  };

  const handleDeleteCoupon = async () => {
    if (!couponToDelete) return;
    try {
      // Simulate soft deleting
      setCoupons(coupons.map(c =>
        c.id === couponToDelete.id ? { ...c, isDeleted: true } : c
      ));
      setShowDeleteConfirm(false);
      setCouponToDelete(null);
      alert("Coupon marked as deleted!");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Failed to delete coupon.");
    }
  };

  const handleRestoreCoupon = async (couponToRestore) => {
    if (!couponToRestore) return;
    try {
      // Simulate restoring a coupon
      setCoupons(coupons.map(c =>
        c.id === couponToRestore.id ? { ...c, isDeleted: false } : c
      ));
      alert(`Coupon "${couponToRestore.code}" restored!`);
    } catch (error) {
      console.error("Error restoring coupon:", error);
      alert("Failed to restore coupon.");
    }
  };

  const activeCoupons = coupons.filter(coupon => !coupon.isDeleted);
  const deletedCoupons = coupons.filter(coupon => coupon.isDeleted);

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add New Coupon'}
      </button>

      {showAddForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Add New Coupon</h2>
            <form onSubmit={handleAddCoupon}>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">Coupon Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  name="code"
                  value={newCoupon.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  value={newCoupon.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={newCoupon.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">Add Coupon</button>
            </form>
          </div>
        </div>
      )}

      <h2>Available Coupons</h2>
      {activeCoupons.length === 0 ? (
        <p>No active coupons available.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Code</th>
              <th>Expiry Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeCoupons.map(coupon => (
              <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>{coupon.expiryDate}</td>
                <td>{coupon.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(coupon)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => openDeleteConfirm(coupon)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />
      <div className="my-4">
        <button className="btn btn-info" onClick={() => setShowDeleted(!showDeleted)}>
          {showDeleted ? 'Hide Deleted Coupons' : 'Show Deleted Coupons'} ({deletedCoupons.length})
        </button>
      </div>

      {showDeleted && (
        <div>
          <h2>Deleted Coupons</h2>
          {deletedCoupons.length === 0 ? (
            <p>No deleted coupons.</p>
          ) : (
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedCoupons.map(coupon => (
                  <tr key={coupon.id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.description}</td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={() => handleRestoreCoupon(coupon)}>
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}


      {/* Edit Coupon Modal */}
      {showEditModal && editingCoupon && (
        <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Coupon</h5>
                <button type="button" className="btn-close" onClick={() => { setShowEditModal(false); setEditingCoupon(null); }}></button>
              </div>
              <form onSubmit={handleUpdateCoupon}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editCode" className="form-label">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editCode"
                      name="code"
                      value={editingCoupon.code}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editExpiryDate" className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="editExpiryDate"
                      name="expiryDate"
                      value={editingCoupon.expiryDate}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      name="description"
                      value={editingCoupon.description}
                      onChange={handleEditInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowEditModal(false); setEditingCoupon(null); }}>Close</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && couponToDelete && (
         <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => { setShowDeleteConfirm(false); setCouponToDelete(null); }}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the coupon "{couponToDelete.code}"? This action cannot be undone (simulated soft delete).</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowDeleteConfirm(false); setCouponToDelete(null); }}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteCoupon}>Delete Coupon</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponManagementPage;