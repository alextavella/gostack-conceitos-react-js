import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    try {
      api.get('/repositories').then(response => {
        setRespositories(response.data);
      });
    } catch (e) {
      console.log('Erro ao carregar repositorios', e.message);
    }
  }, [])

  async function handleAddRepository() {
    try {
      const repository = {
        "url": "https://github.com/alextavella",
        "title": `Novo Repository ${Date.now()}`,
        "techs": ["React", "ReactJS", "ReactNative", "TypeScript"],
      };

      const response = await api.post('/repositories', repository);

      setRespositories([...repositories, response.data]);
    } catch (e) {
      console.log('Erro ao cadastrar repositorio', e.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRespositories(repositories.filter(r => r.id !== id));
    } catch (e) {
      console.log('Erro ao remover repositorio', e.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
