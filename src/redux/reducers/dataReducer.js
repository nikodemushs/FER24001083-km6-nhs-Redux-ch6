import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroId: null,
  heroDetail: null,
  items: [],
  itemId: null,
  itemDetail: null,
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setHeroes: (state, action) => {
      state.heroes = action.payload;
    },
    setHeroId: (state, action) => {
      state.heroId = action.payload;
    },
    setHeroDetail: (state, action) => {
      state.heroDetail = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
  },
});

export const {
  setHeroes,
  setHeroId,
  setHeroDetail,
  setItems,
  setItemId,
  setItemDetail,
} = dataSlicer.actions;

export default dataSlicer.reducer;
