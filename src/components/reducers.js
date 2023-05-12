import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  forms: [],
  filteredForms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    createForm: (state, action) => {
      state.forms.push(action.payload);
    },
    editForm: (state, action) => {
      const { id, ...updatedForm } = action.payload;
      const index = state.forms.findIndex((form) => form.id === id);
      if (index !== -1) {
        state.forms[index] = { ...state.forms[index], ...updatedForm };
      }
    },
    changeCategory: (state, action) => {
      const { formId, categoryId } = action.payload;
      const form = state.forms.find((form) => form.id === formId);
      if (form) {
        form.categoryId = categoryId;
      }
    },
  
    filterForms: (state, action) => {
        const categoryName = action.payload;
        state.filteredForms = categoryName === "All"
          ? state.forms
          : state.forms.filter((form) => form.categoryId === categoryName);
      },
  },
});

export const { createCategory, createForm, editForm, changeCategory, filterForms } = formSlice.actions;

export default formSlice.reducer;
