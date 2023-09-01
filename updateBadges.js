const axios = require("axios");
const fs = require("fs");
const settings = require("./settings.json");

require("dotenv").config();

const labels = ["learning", "snippet", "tool", "language", "wins", "brag"];

console.log("settings", settings);

async function fetchClosedPRCount(owner, name, label, accessToken) {
  try {
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
    return response.data.data.repository.pullRequests.totalCount;
  } catch (e) {
    console.error("e");
  }
}

async function updateBadges(owner, name, accessToken) {
  const badgeUrls = await Promise.all(
    labels.map(async (label) => {
      const count = await fetchClosedPRCount(owner, name, label, accessToken);
      console.log("label", label, "count", count);
      return `https://img.shields.io/badge/${label.replace(
        /\s/g,
        "%20"
      )}-${count}-${settings[label]}`;
    })
  );
  const readmePath = "README.md";
  const readmeContent = fs.readFileSync(readmePath, "utf8");
  console.log("labels", labels, badgeUrls);
  const updatedReadmeContent = labels.reduce((content, label, index) => {
    const regex = new RegExp(
      `\\[(${label})\\]\\(https://img.shields.io/badge/${label.replace(
        /\s/g,
        "%20"
      )}-\\d+-${settings[label]}\\)`
    );
    return content.replace(regex, `[${label}](${badgeUrls[index]})`);
  }, readmeContent);

  fs.writeFileSync(readmePath, updatedReadmeContent, "utf8");
  console.log("successfully wrote the content");
}

const owner = process.argv[2];
const name = process.argv[3];
const accessToken = process.argv[4];

updateBadges(owner, name, accessToken);
