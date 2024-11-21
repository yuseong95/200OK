import axios from 'axios';

const AMAZON_API_BASE_URL = 'http://localhost:8080/amazon';

export const createUser = async (user) =>
  axios.post(`${AMAZON_API_BASE_URL}/user`, user, {
    headers: { 'Content-Type': 'application/json' },
  });

export const getUser = async (userId) => {
  return await axios.get(`${AMAZON_API_BASE_URL}/user/userInfo/${userId}`);
};

export const initStory = async (userId) => {
  await axios.get(`${AMAZON_API_BASE_URL}/story/init/${userId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getStory = async (userId) => {
  try {
    return await axios.get(
      `${AMAZON_API_BASE_URL}/story/currentStory/${userId}`
    );
  } catch (e) {
    // 스토리가 없을 경우 초기화하여 생성

    if (e.response && e.response.status === 404) {
      await initStory(userId);
      return await axios.get(
        `${AMAZON_API_BASE_URL}/story/currentStory/${userId}`
      );
    } else {
      throw e; // 다른 오류가 발생할 경우 다시 던짐
    }
  }
};

export const getNextStory = async (userId, choice) => {
  return await axios.post(
    `${AMAZON_API_BASE_URL}/story/generate/${userId}`,
    choice
  );
};

export const getMonologue = async (userId) => {
  return await axios.get(`${AMAZON_API_BASE_URL}/story/monologue/${userId}`);
};
