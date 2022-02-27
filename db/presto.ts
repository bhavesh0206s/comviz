import axios from "axios";

// const URL = "http://localhost:8080/v1/statement/";
const URL = "https://0d46-114-79-166-175.ngrok.io/v1/statement/";

const fetchUri = async (url: string) => {
  let nextUri = url;
  while (true) {
    const resp = await axios.get(nextUri);
    let data = resp.data;
    if (data["data"]) {
      const cols = data["columns"];
      const rows = data["data"];
      const info = {};
      for (let i = 0; i < cols.length; i++) {
        info[cols[i].name] = rows.map((item) => item[i]);
      }
      console.log(info);
      return;
    } else if (typeof data["nextUri"] === "string") {
      nextUri = data["nextUri"];
    } else {
      console.log(data);
      return;
    }
  }
};

const fetchDb = async () => {
  const resp = await axios({
    method: "post",
    url: URL,
    headers: {
      "X-Trino-User": "sr1jan",
      "X-Trino-Source": "comviz",
      "X-Trino-Catalog": "mongodb",
    },
    data: "select type, category from mongodb.pulse.top limit 5",
  });

  let info = resp.data;
  await fetchUri(info["nextUri"]);
};

fetchDb();
