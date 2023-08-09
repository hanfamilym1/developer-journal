const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

const labels = ["learning", "snippet", "tool", "language", "wins", "brag"];

async function fetchClosedPRCount(owner, name, label, accessToken) {
  try {
    console.log("owner", owner, name, accessToken);
    const query = `
      {
        repository(owner: "${owner}", name: "${name}") {
          pullRequests(states: MERGED, labels: ["${label}"]) {
            totalCount
          }
        }
      }
    `;

    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data.data.repository.pullRequests.totalCount;
  } catch (e) {
    console.error(e);
  }
}

async function updateBadges(owner, name, accessToken) {
  const badgeUrls = await Promise.all(
    labels.map(async (label) => {
      const count = await fetchClosedPRCount(owner, name, label, accessToken);
      return `https://img.shields.io/badge/${label.replace(
        /\s/g,
        "%20"
      )}-${count}-blue`;
    })
  );

  const readmePath = "README.md";
  const readmeContent = fs.readFileSync(readmePath, "utf8");

  const updatedReadmeContent = labels.reduce((content, label, index) => {
    const regex = new RegExp(
      `\\[(${label})\\]\\(https://img.shields.io/badge/${label.replace(
        /\s/g,
        "%20"
      )}-\\d+-blue\\)`
    );
    return content.replace(regex, `[${label}](${badgeUrls[index]})`);
  }, readmeContent);

  fs.writeFileSync(readmePath, updatedReadmeContent, "utf8");
}

const owner = process.argv[2];
const name = process.argv[3];
const accessToken = process.argv[4];

updateBadges(owner, name, accessToken);
