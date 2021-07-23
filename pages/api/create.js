// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

const value = "secret_B0xDofCVAcEGLTBO9kzmGqnzJPoLr91sf90LiB5pXvF";

export default async (req, res) => {
  let text = req.query.text;
  
  let token = req.headers["x-token"];
  const notion = new Client({ auth: token });

  // const blockId = "4925345f-4ead-4af8-b354-b38cb6f46977";
  let baseId = req.headers["x-base"];

  const response = await notion.blocks.children.append({
    block_id: baseId,
    children: [
      {
        object: "block",
        type: "to_do",
        to_do: {
          text: [
            {
              type: "text",
              text: {
                content: text,
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);

  res.status(200).json({ response });
};
