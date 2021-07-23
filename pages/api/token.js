const { Client } = require("@notionhq/client");

export default async (req, res) => {
  let token = req.headers["x-token"];
  const notion = new Client({ auth: token });
  console.log(token);
  const response = await notion.search({
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });

  let pages = [];
  let title;
  Object.entries(response.results).forEach((obj, i) => {
    if (
      obj[1].object == "page" &&
      obj[1].hasOwnProperty("parent") &&
      obj[1].parent.type == "workspace"
    ) {
      title = obj[1].properties.title.title[0].plain_text;
      console.log(obj[1].id, obj[1].properties.title.title[0].plain_text);
      pages.push(title);
    }
  });

  res.status(200).json({ pages });
};
