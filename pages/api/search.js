// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

export default async (req, res) => {
  let token = req.headers["x-token"];
  const notion = new Client({ auth: token });

  const response = await notion.search({
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });

  let pages = [];
  let id;
  let title;
  Object.entries(response.results).forEach((obj, i) => {
    if (
      obj[1].object == "page" &&
      obj[1].hasOwnProperty("parent") &&
      obj[1].parent.type == "workspace"
    ) {
      title = obj[1].properties.title.title[0].plain_text;
      id = obj[1].id;
      console.log(obj[1].id, obj[1].properties.title.title[0].plain_text);
      pages.push({ id, title });
    }
  });

  res.status(200).json({ pages });
};
