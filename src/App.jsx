import { useState, useEffect } from 'react';
import styled from "styled-components";
import Graph from "react-graph-vis";
import axios from 'axios';
import "./App.css";

function App() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    const fetchgraph = async () => {
      const url = 'https://network-backend.vercel.app/nodes';

      try {
        const response = await axios.get(url);
        setGraph(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchgraph();
  }, []);

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "1000px"
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Container>
      {graph?.nodes &&
        <StyledGraph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
          }}
        />}
    </Container>
  );
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledGraph = styled(Graph)`
    min-height: 100vh;
`

export default App;
