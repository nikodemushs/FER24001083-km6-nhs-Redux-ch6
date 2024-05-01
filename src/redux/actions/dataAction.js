import axios from "axios";
import {
  setHeroes,
  setHeroDetail,
  setItems,
  setItemDetail,
  setMatchups,
  setMatchupDetail,
} from "../reducers/dataReducer";
import { data } from "../../Data";
export const getAllHeroes = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`https://api.opendota.com/api/heroStats`);
    console.log("REDUX response", response.data);
    dispatch(setHeroes(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getDetailHero = () => async (dispatch, getState) => {
  try {
    const id = getState().data.heroId;
    console.log("id :>> ", id);
    const response = await axios.get(`https://api.opendota.com/api/heroStats`);
    console.log("REDUX response", response.data);
    const detailHero = response.data.find((hero) => hero.id === id);
    console.log("detailHero :>> ", detailHero);
    dispatch(setHeroDetail(detailHero));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getAllItems = () => async (dispatch, getState) => {
  try {
    const itemData = data.flatMap((item) => Object.values(item));
    console.log("itemData :>> ", itemData);
    dispatch(setItems(itemData));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getItemDetail = () => async (dispatch, getState) => {
  try {
    const id = getState().data.itemId;
    console.log("id ACTION :>> ", id);
    const itemData = data.flatMap((item) => Object.values(item));
    const detailItem = itemData.find((item) => item?.id === id);
    console.log("detailItem :>> ", detailItem);
    dispatch(setItemDetail(detailItem));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMatchups = () => async (dispatch, getState) => {
  try {
    const id = getState().data.heroId;
    console.log("id MATCHUP :>> ", id);
    const response = await axios.get(
      `https://api.opendota.com/api/heroes/${id}/matchups`
    );
    console.log("Matchup Response", response.data);
    dispatch(setMatchups(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMatchupDetails = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`https://api.opendota.com/api/heroStats`);
    const heroesMap = {};
    response.data.forEach((hero) => {
      heroesMap[hero.id] = hero;
    });
    console.log("heroesMapACTION :>> ", heroesMap);
    dispatch(setMatchupDetail(heroesMap));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
