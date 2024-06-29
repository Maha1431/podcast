import { BASE_URL, STORAGE_KEY } from "@/contexts/userAuth";
import AxiosClient from "@/utils/axios";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  project: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action) {
      return { ...state, project: action.payload };
    },
    setIsLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
    addEpisode(state, action) {
      state.project.episodes.push(action.payload);
    },
    removeEpisode(state, action) {
      state.project.episodes = state.project.episodes.filter(
        (episode) => episode._id !== action.payload
      );
    },
    updateTranscript(state, action) {
      const { episodeId, transcript } = action.payload;
      state.project.episodes = state.project.episodes.map((episode) => {
        if (episodeId === episode._id) {
          return { ...episode, transcript };
        }
        return episode;
      });
    },
    updateGeneralConfig(state, action) {
      const { chatbotName, welcomeMessage, inputPlaceholder } = action.payload;
      state.project = {
        ...state.project,
        chatbotName,
        welcomeMessage,
        inputPlaceholder,
      };
    },
  },
});

export async function createProject(name) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.post(
      `${BASE_URL}/project/`,
      { name },
      { headers: { Authorization: userId } }
    );
    return res.data.project;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectById(id) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.get(`${BASE_URL}/project/${id}`, {
      headers: { Authorization: userId },
    });
    console.log(res.data);
    return res.data.project;
  } catch (error) {
    console.log(error);
  }
}

export async function createEpisode(projectId, name, link) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.post(
      `${BASE_URL}/project/${projectId}/episode`,
      { name, link },
      { headers: { Authorization: userId } }
    );
    return res.data.episode;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEpisode(projectId, episodeId) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.delete(
      `${BASE_URL}/project/${projectId}/episode/${episodeId}`,
      { headers: { Authorization: userId } }
    );
    return res.data.episode;
  } catch (error) {
    console.log(error);
  }
}

export async function updateEpisodeTranscript(
  projectId,
  episodeId,
  transcript
) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.post(
      `${BASE_URL}/project/${projectId}/episode/${episodeId}`,
      { transcript },
      { headers: { Authorization: userId } }
    );
    console.log(res);
    return res.data.episode;
  } catch (error) {
    console.log(error);
  }
}

export async function updateGeneralConfiguration(
  projectId,
  generalConfigParams
) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);
    const res = await axios.post(
      `${BASE_URL}/project/${projectId}/widgetConfiguration/general`,
      { generalConfigParams },
      { headers: { Authorization: userId } }
    );
    console.log(res);
    const { chatbotName, welcomeMessage, inputPlaceholder } = res.data.project;
    return { chatbotName, welcomeMessage, inputPlaceholder };
    // console.log(res.data.project);
    // return res.data.project;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDisplayConfiguration(
  projectId,
  formData,
  displayConfigParams
) {
  try {
    const userId = localStorage.getItem(STORAGE_KEY);

    const res2 = await axios.post(
      `${BASE_URL}/project/${projectId}/widgetConfiguration/display`,
      displayConfigParams,
      { headers: { Authorization: userId } }
    );

    if (formData) {
      console.log("image");
      const res1 = await axios.post(
        `${BASE_URL}/project/${projectId}/image`,
        formData,
        {
          headers: {
            Authorization: userId,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res1.data.imageUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

export const {
  setProject,
  setIsLoading,
  addEpisode,
  removeEpisode,
  updateTranscript,
  updateGeneralConfig,
} = projectSlice.actions;

export default projectSlice.reducer;

export const getProjectName = (state) => {
  console.log(state.name);
  return state.project.name;
};

export const getProjectEpisodes = (state) => {
  console.log(state);
  return state.project.episodes;
};

export const getProject = (state) => state.project;

export const getEpisode = (episodeId) => (state) =>
  state.project.episodes?.find((episode) => episode._id === episodeId);

export const getLoadingState = (state) => state.isLoading;

export const getProjectGeneralConfig = (state) => {
  const { chatbotName, welcomeMessage, inputPlaceholder } = state.project;
  return { chatbotName, welcomeMessage, inputPlaceholder };
};

export const getProjectDisplayConfig = (state) => {
  const {
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    showSources,
    chatIconSize,
    positionOnScreen,
    distanceFromBottom,
    horizontalDistance,
    botIconImageName,
  } = state.project;

  return {
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    showSources,
    chatIconSize,
    positionOnScreen,
    distanceFromBottom,
    horizontalDistance,
    botIconImageName,
  };
};
