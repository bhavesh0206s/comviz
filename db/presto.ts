import axios from "axios";

const URL = "http://localhost:8080/v1/statement/";

const fetchUri = async (url: string) => {
  let nextUri = url;
  while (true) {
    const resp = await axios.get(nextUri);
    let data = resp.data;
    if (data["data"]) {
      console.log("DATA\n", data["data"]);
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
