const fs = require('fs');

let teams = new Set(),
  conts = [],
  tableData = [],
  scores = {};

let teamStats = {};

function load(contest) {
  teamStats[contest] = {};
  conts.push(contest);
  let data = JSON.parse(fs.readFileSync(`./contests/${contest}.json`));
  let probCount = 0;
  let acc = {}
  let maxSovled = 0;
  let teamsCount = 0;
  while (String.fromCharCode(probCount + 'A'.charCodeAt(0)) in data[0].detail) {
    acc[String.fromCharCode(probCount + 'A'.charCodeAt(0))] = 0;
    probCount++;
  }

  for (let item of data) {
    let solved = 0;
    for (let prob in item.detail) {
      if (item.detail[prob].time != -1)
        acc[prob] += 1;
        solved += 1;
    }
    maxSovled = Math.max(maxSovled, solved);
    if (solved > 0)
      teamsCount += 1;
  }

  // let cnt200 = 0;
// 
  // for (let i in data) {
  //   if (i == "200")
  //     break;
// 
  //   let item = data[i];
  //   for (let prob in item.detail) {
  //     if (item.detail[prob].time != -1)
  //       cnt200 += 1;
  //   }
  // }


  const buptHDU = {
    "team401": "摩可彭塔斯",
    "team402": "网瘾犯了求求你把牌子给我",
    "team403": "彰显王威吧，踏遍世间的十二辉剑！",
    "team404": "遥遥领先于友队",
    "team405": "好好想想队",
    "team406": "堂吉诃德",
    "team407": "帮帮我，评测机老爷爷！",
    "team408": "三个臭皮匠",
    "team409": "如果爆零能报销回家车费吗",
    "team410": "试者如斯夫，不舍昼夜",
    "team411": "华为手机",
    "team412": "嘉然今天吃汉堡",
    "team413": "我宣布以上成绩无效",
    "team414": "歪日，这么虾头？",
    "team415": "啊对对队",
    "team416": "金牌厨师",
    "team417": "DP_PTSD",
    "team418": "吃堡没吃饱",
    "team419": "我太想AC了",
    "team420": "4000g_Pt",
    "team421": "对了没？如队",
  }
  const buptNC = {
    "team401": "摩可彭塔斯",
    "team402": "网瘾犯了求求你把牌子给我",
    "team403": "彰显王威吧，踏遍世间的十二辉剑！",
    "team404": "遥遥领先于友队",
    "team405": "好好想想队",
    "team406": "堂吉诃德",
    "team407": "帮帮我，评测机老爷爷！",
    "team408": "三个臭皮匠",
    "team409": "如果爆零能报销回家车费吗",
    "team410": "试者如斯夫，不舍昼夜",
    "team411": "华为手机",
    "team412": "嘉然今天吃汉堡",
    "team413": "我宣布以上成绩无效",
    "team414": "歪日，这么虾头？",
    "team415": "啊对对队",
    "team416": "金牌厨师",
    "team417": "DP_PTSD",
    "team418": "吃堡没吃饱",
    "team419": "我太想AC了",
    "team420": "4000g_Pt",
    "team421": "对了没？如队",
  }
  const buptVJ = {
    "team401": "mocopentas",
    "team402": "pair_Ac_Ac",
    "team403": "Joyeuse_Ordre",
    "team404": "Liangsheng298",
    "team405": "_nepenthe_",
    "team406": "Don_Quixote",
    "team407": "zengwei1",
    "team408": "three_newbie",
    "team409": "yidau",
    "team410": "neetman",
    "team411": "nzot",
    "team412": "UltraCat",
    "team413": "err_Grade",
    "team414": "Bush_Gamma",
    "team415": "A_Duiduidui",
    "team416": "O_start",
    "team417": "DP_PTSD",
    "team418": "Humgry",
    "team419": "WeMissAcSoMuch",
    "team420": "4000g_Pt",
    "team421": "void_WarmUp",
  }
  let hi = -1;
  for (let i in data) {
    let item = data[i];
    let rank = parseInt(item.rank);
    let cnt = 0;
    for (let prob in item.detail) {
      if (item.detail[prob].time != -1)
        cnt += 1;
    }
    // let score = Math.max(0, cnt / cnt200 * (500 - parseInt(item.rank)));
    // if (hi == -1)
    //   hi = score;
    // score = score / hi * 100;
    let score = Math.max(0, 100 * cnt / maxSovled * ((teamsCount - rank + 1) / teamsCount)); // 2024 春季训练计分方式
    if (contest.indexOf("hd") != -1) {
      item.school = (item.name.split('   '))[1];
      item.name = (item.name.split('   '))[0];
      if (item.name in buptHDU)
        item.name = buptHDU[item.name];
    }

    if (contest.indexOf("cc") != -1) {
      item.school = (item.name.split(' '))[2];
      item.name = (item.name.split(' '))[1];
      //if (item.name in buptHDU)
      //  item.name = buptHDU[item.name];
    }

    if (contest.indexOf("ic") != -1) {
      item.school = (item.name.split(' '))[0];
      item.name = (item.name.split(' '))[1];
      //if (item.name in buptHDU)
      //  item.name = buptHDU[item.name];
    }

    if (contest.indexOf("vj") != -1) {
      item.school = "北京邮电大学";
      item.name = (item.name.split('('))[0];
    }
    // console.log(item.name, item.school);

    if (Object.values(buptHDU).includes(item.name)&&item.school=="北京邮电大学") {
      teams.add(item.name);
      teamStats[contest][item.name] = `${item.rank}/${cnt}/${score.toFixed(2)}`;
      let found = false;
      for (let t of tableData)
        if (t.name == item.name) {
          found = true;
          scores[item.name].push(parseFloat(score.toFixed(2)));
        }
      if (!found) {
        scores[item.name] = [];
        for (let i = 0; i < conts.length - 1; ++i)
          scores[item.name].push(0);
        scores[item.name].push(parseFloat(score.toFixed(2)));
        tableData.push({ "name": item.name, "type": "line", "data": scores[item.name], "markLine": { "data": [{ "type": "average", "name": "平均值" }] } });
      }
    }
    else if (Object.values(buptNC).includes(item.name)&&item.school=="北京邮电大学") {
      // Find the item.name in buptHDU which is the same team
      let HDUname = "";
      for (let key in buptNC) {
        if (buptNC[key] == item.name) {
          HDUname = buptHDU[key];
        }
      }
      // if(item.name=="UnnamedTeam") console.log(HDUname,item.rank);
      teams.add(HDUname);
      teamStats[contest][HDUname] = `${item.rank}/${cnt}/${score.toFixed(2)}`;
      // if(item.name=="UnnamedTeam") console.log(teamStats[contest][HDUname]);
      let found = false;
      for (let t of tableData)
        if (t.name == HDUname) {
          found = true;
          scores[HDUname].push(parseFloat(score.toFixed(2)));
        }
      // if(item.name=="UnnamedTeam") console.log(scores[HDUname],parseFloat(score.toFixed(2)));
      if (!found) {
        scores[HDUname] = [];
        for (let i = 0; i < conts.length - 1; ++i)
          scores[HDUname].push(0);
        scores[HDUname].push(parseFloat(score.toFixed(2)));
        tableData.push({ "name": HDUname, "type": "line", "data": scores[HDUname], "markLine": { "data": [{ "type": "average", "name": "平均值" }] } });
      }
    } else if (Object.values(buptVJ).includes(item.name)&&item.school=="北京邮电大学") {
      // Find the item.name in buptHDU which is the same team
      let HDUname = "";
      for (let key in buptVJ) {
        if (buptVJ[key] == item.name) {
          HDUname = buptHDU[key];
        }
      }
      // if(item.name=="UnnamedTeam") console.log(HDUname,item.rank);
      teams.add(HDUname);
      teamStats[contest][HDUname] = `${item.rank}/${cnt}/${score.toFixed(2)}`;
      // if(item.name=="UnnamedTeam") console.log(teamStats[contest][HDUname]);
      let found = false;
      for (let t of tableData)
        if (t.name == HDUname) {
          found = true;
          scores[HDUname].push(parseFloat(score.toFixed(2)));
        }
      // if(item.name=="UnnamedTeam") console.log(scores[HDUname],parseFloat(score.toFixed(2)));
      if (!found) {
        scores[HDUname] = [];
        for (let i = 0; i < conts.length - 1; ++i)
          scores[HDUname].push(0);
        scores[HDUname].push(parseFloat(score.toFixed(2)));
        tableData.push({ "name": HDUname, "type": "line", "data": scores[HDUname], "markLine": { "data": [{ "type": "average", "name": "平均值" }] } });
      }
    }
  }

  for (let t of tableData)
    if (t.data.length != conts.length) {
      t.data.push(0);
    }
}

let arr = fs.readdirSync('./contests');

for (let i of arr) {
  load(i.split('.')[0]);
  console.log(i.split('.')[0], " generated.")
}

fs.writeFileSync("stat.json", JSON.stringify({
  teams: Array.from(teams),
  conts: conts,
  data: tableData,
  scores: scores,
  teamStats: teamStats
}));
