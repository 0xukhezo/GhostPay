// React
import { useEffect, useState } from "react";
// Graph
import { Graph, client } from "../app/api/graph/route";

export const useFetchLoans = () => {
  const [paymasters, setPaymasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPaymasters() {
    const queryBody = PAYMASTER_QUERY;

    try {
      let response = await client.query({ query: Graph(queryBody) });
      setLoading(false);
      setPaymasters(response.data.paymasters);
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchPaymasters();
  }, []);

  return { paymasters, loading };
};
