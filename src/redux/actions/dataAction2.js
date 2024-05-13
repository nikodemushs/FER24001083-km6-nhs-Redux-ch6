import axios from "axios";
import { setLores, setAbilities, setAbilityId } from "../reducers/dataReducer2";

export const getLoreHero = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.opendota.com/api/constants/hero_lore`
    );

    dispatch(setLores(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getHeroAbilities = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.opendota.com/api/constants/abilities`
    );

    dispatch(setAbilities(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// export const getHeroAbilitiesId = () => async (dispatch, getState) => {
//   try {
//     const response = await axios.get(
//       `https://api.opendota.com/api/constants/ability_ids`
//     );

//     dispatch(setAbilityId(response.data));
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       alert(error.message);
//       return;
//     }
//     alert(error.message);
//   }
// };
