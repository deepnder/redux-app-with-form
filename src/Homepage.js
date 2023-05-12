import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { createCategory,  createForm,
      editForm,
       changeCategory,
       filterForms,} from './components/reducers';
import './App.css';

export default function Homepage() {
  const categories = useSelector((state) => state.form.categories);
  const forms = useSelector((state) => state.form.forms);
  const filteredForms = useSelector((state) => state.form.filteredForms);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState('');
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    uid: '',
    phoneNumber: '',
    description: '',
    categoryId: '',
  });

  const handleCreateCategory = () => {
    if (newCategory !== '') {
      const category = {
        id: Date.now().toString(),
        name: newCategory,
      };
      dispatch(createCategory(category));
      setNewCategory('');
    }
  };

  const handleCreateForm = () => {
    if (
      newForm.name !== '' &&
      newForm.email !== '' &&
      newForm.uid !== ''
    ) {
      const form = {
        id: Date.now().toString(),
        ...newForm,
      };
      dispatch(createForm(form));
      setNewForm({
        name: '',
        email: '',
        uid: '',
        phoneNumber: '',
        description: '',
        categoryId: '',
      });
    }
  };

  const handleEditForm = (formId, updatedForm) => {
    dispatch(editForm({ id: formId, ...updatedForm }));
  };

  const handleChangeCategory = (formId, categoryId) => {
    dispatch(changeCategory({ formId, categoryId }));
    setNewForm({ ...newForm, categoryId });
  };

  const handleFilterForms = (categoryName) => {
    dispatch(filterForms(categoryName));
  };

  
  return (
    <>
    <div className="container">
      <h1>Redux App</h1>
      <div className="form-container">
        <h2>Create Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="create-button" onClick={handleCreateCategory}>
          Create
        </button>
      </div>
      <div className="form-container">
        <h2>Create Form</h2>
        <input
          type="text"
          placeholder="Name"
          value={newForm.name}
          onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newForm.email}
          onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="UID"
          value={newForm.uid}
          onChange={(e) => setNewForm({ ...newForm, uid: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newForm.phoneNumber}
          onChange={(e) =>
            setNewForm({ ...newForm, phoneNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newForm.description}
          onChange={(e) =>
            setNewForm({ ...newForm, description: e.target.value })
          }
        />
        <select
          value={newForm.categoryId}
          onChange={(e) =>
            setNewForm({ ...newForm ,categoryId: e.target.value })}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className="create-button" onClick={handleCreateForm}>
              Create
            </button>
          </div>
          <div className="form-container">
            <h2>Edit Form</h2>
            {forms.map((form) => (
              <div key={form.id}>
                <h3>Form {form.id}</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    handleEditForm(form.id, { name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    handleEditForm(form.id, { email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="UID"
                  value={form.uid}
                  onChange={(e) =>
                    handleEditForm(form.id, { uid: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    handleEditForm(form.id, { phoneNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    handleEditForm(form.id, { description: e.target.value })
                  }
                />
                <select
                  value={form.categoryId}
                  onChange={(e) => handleChangeCategory(form.id, e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="form-container">
            <h2>Filter Forms</h2>
            <select onChange={(e) => handleFilterForms(e.target.value)}>
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-container">
            <h2>Filtered Forms</h2>
            {filteredForms.map((form) => (
              <div key={form.id}>
                <h3>Form {form.id}</h3>
                <p>Name: {form.name}</p>
                <p>Email: {form.email}</p>
                <p>UID: {form.uid}</p>
                <p>Phone Number: {form.phoneNumber}</p>
                <p>Description: {form.description}</p>
                <p>Category: {form.categoryId}</p>
              </div>
            ))}
          </div>
        </div>
      
    
    




    
    </>
  )
}
