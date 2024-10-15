import React, { useEffect, useState } from 'react';
import { getUserData, getTotalXP, getProjectStats } from '../../services/graph';
import { useUserId } from '../../services/auth';
import './profile.css';
import XPGraph from '../graphs/xpgraph';
import ProjectRatioGraph from '../graphs/projectRatioGraph';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [totalXP, setTotalXP] = useState(0);
  const [passedProjects, setPassedProjects] = useState(0);
  const [failedProjects, setFailedProjects] = useState(0);
  const userId = useUserId();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setUserData(user);

        const xp = await getTotalXP(user.id);
        setTotalXP(xp);

        const { passed, failed } = await getProjectStats(user.id);
        setPassedProjects(passed);
        setFailedProjects(failed);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!userData) return <p>Загрузка...</p>;

  return (
    <div className="profile-container">
      <h2>Прогресс обучения</h2>
      <p>Добро пожаловать, {userData.login}!</p>
      <div className="stats">
        <p>Общее количество XP: {totalXP}</p>
        <p>Пройдено проектов: {passedProjects}</p>
        <p>Не пройдено проектов: {failedProjects}</p>
      </div>
      {/* Отображение графиков */}
      <div className="graphs">
        <div className="graph">
          <h3>Прогресс XP</h3>
          <XPGraph userId={userId} />
        </div>
        <div className="graph">
          <h3>Соотношение проектов</h3>
          <ProjectRatioGraph userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
