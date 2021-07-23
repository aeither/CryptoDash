// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

const value = "secret_B0xDofCVAcEGLTBO9kzmGqnzJPoLr91sf90LiB5pXvF";

export default async (req, res) => {
  let token = req.headers["x-token"];
  const notion = new Client({ auth: token });

  const blockId = req.headers["x-base"];
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });

  let toDos = [];
  Object.entries(response.results).forEach((block, i) => {
    if (block[1].type == "to_do") {
      let text = block[1].to_do.text[0].plain_text;
      let checked = block[1].to_do.checked;
      console.log(text, checked)
      toDos.push({ text, checked });
    }
  });

  res.status(200).json(toDos);
};
