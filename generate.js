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
  let maxSolved = 0;
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
    maxSolved = Math.max(maxSolved, solved);
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
  
  const teamsNumber = {
    "vj6" : 82,
    "vj8" : 42,
    "vj9" : 244,
    "vj10" : 250,
    "vj11" : 183,
    "vj12" : 198,
  }
  
  if (contest.contains("vj")) {
    teamsCount = teamsNumber[contest];
  }
  
  console.log(contest, maxSolved, teamsCount);

  const buptHDU = {
    "team401": "摩可彭塔斯（区庆亮，鲍睿钊，谭怡萱）",
    "team402": "网瘾犯了求求你把牌子给我（刘益铭，陈杰祥，谢志宏）",
    "team403": "彰显王威吧，踏遍世间的十二辉剑！（张颢龄，谢牧航，王若竹）",
    "team404": "遥遥领先于友队（王昰妍，梁浩然，李鹏烁）",
    "team405": "好好想想队（司睿洋，尹昱钦，张泽文）",
    "team406": "堂吉诃德（卢安来，王冀恒，管庆涵）",
    "team407": "帮帮我，评测机老爷爷！（田苗，曾巍，蔡禹煊）",
    "team408": "三个臭皮匠（袁桦斌，杨毅霖，马骐荣）",
    "team409": "如果爆零能报销回家车费吗（赵佳一，陈育堃，李天阳）",
    "team410": "试者如斯夫，不舍昼夜（安澍，秦维斌，李泽林）",
    "team411": "世界其实是一个巨大的华为手机（赵瑞霖，李乐扬，张智成）",
    "team412": "嘉然今天吃汉堡（王智炜，胡诚成，李博识）",
    "team413": "我宣布以上成绩无效（田艺彬，王华德，李子俊）",
    "team414": "歪日，这么虾头？（安奕轩，谢楠，林米乐）",
    "team415": "啊对对队*[不再随队训练]",
    "team416": "金牌厨师（乔函祺，李思远，马铂凯）",
    "team417": "DP_PTSD（王垚烨，蒙忠格，黄志阳）",
    "team418": "吃堡没吃饱（吴优，单一凡，金旭一）",
    "team419": "我太想AC了（马云霄，侯尔为，刘奕安）",
    "team420": "4000g_Pt（冯国晟，于洋，马廷良）",
    "team421": "对了没？如队（曾行周，钱文韬，徐衍巅）",
  }
  const buptNC = {
    "team401": "摩可彭塔斯（区庆亮，鲍睿钊，谭怡萱）",
    "team402": "网瘾犯了求求你把牌子给我（刘益铭，陈杰祥，谢志宏）",
    "team403": "彰显王威吧，踏遍世间的十二辉剑！（张颢龄，谢牧航，王若竹）",
    "team404": "遥遥领先于友队（王昰妍，梁浩然，李鹏烁）",
    "team405": "好好想想队（司睿洋，尹昱钦，张泽文）",
    "team406": "堂吉诃德（卢安来，王冀恒，管庆涵）",
    "team407": "帮帮我，评测机老爷爷！（田苗，曾巍，蔡禹煊）",
    "team408": "三个臭皮匠（袁桦斌，杨毅霖，马骐荣）",
    "team409": "如果爆零能报销回家车费吗（赵佳一，陈育堃，李天阳）",
    "team410": "试者如斯夫，不舍昼夜（安澍，秦维斌，李泽林）",
    "team411": "世界其实是一个巨大的华为手机（赵瑞霖，李乐扬，张智成）",
    "team412": "嘉然今天吃汉堡（王智炜，胡诚成，李博识）",
    "team413": "我宣布以上成绩无效（田艺彬，王华德，李子俊）",
    "team414": "歪日，这么虾头？（安奕轩，谢楠，林米乐）",
    "team415": "啊对对队*[不再随队训练]",
    "team416": "金牌厨师（乔函祺，李思远，马铂凯）",
    "team417": "DP_PTSD（王垚烨，蒙忠格，黄志阳）",
    "team418": "吃堡没吃饱（吴优，单一凡，金旭一）",
    "team419": "我太想AC了（马云霄，侯尔为，刘奕安）",
    "team420": "4000g_Pt（冯国晟，于洋，马廷良）",
    "team421": "对了没？如队（曾行周，钱文韬，徐衍巅）",
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
    let score = Math.max(0, 100 * cnt / maxSolved * ((teamsCount - rank + 1) / teamsCount)); // 2024 春季训练计分方式
    if (contest.indexOf("hd") != -1) {
      item.school = (item.name.split('   '))[1];
      item.name = (item.name.split('   '))[0];
      if (item.name in buptHDU)
        item.name = buptHDU[item.name];
    }

    if (contest.indexOf("cc") != -1) {
      item.school = (item.name.split(' '))[2];
      item.name = (item.name.split(' '))[1];
    }

    if (contest.indexOf("ic") != -1) {
      item.school = (item.name.split(' '))[0];
      item.name = (item.name.split(' '))[1];
    }

    if (contest.indexOf("vj") != -1) {
      item.school = "北京邮电大学";
      item.name = (item.name.split('('))[0];
    }

    let HDUname = "";
    if (Object.values(buptHDU).includes(item.name)&&item.school=="北京邮电大学") {
      HDUname = item.name;
    }
    else if (Object.values(buptNC).includes(item.name)&&item.school=="北京邮电大学") {
      for (let key in buptNC) {
        if (buptNC[key] == item.name) {
          HDUname = buptHDU[key];
        }
      }
    }
    else if (Object.values(buptVJ).includes(item.name)) {
      item.school = "北京邮电大学";
      for (let key in buptVJ) {
        if (buptVJ[key] == item.name) {
          HDUname = buptHDU[key];
        }
      }
    }

    if (HDUname == "") {
      continue;
    }

    teams.add(HDUname);
    teamStats[contest][HDUname] = `${item.rank}/${cnt}/${score.toFixed(2)}`;
    let found = false;
    for (let t of tableData)
      if (t.name == HDUname) {
        found = true;
        scores[HDUname].push(parseFloat(score.toFixed(2)));
      }
    if (!found) {
      scores[HDUname] = [];
      for (let i = 0; i < conts.length - 1; ++i)
        scores[HDUname].push(0);
      scores[HDUname].push(parseFloat(score.toFixed(2)));
      tableData.push({ "name": HDUname, "type": "line", "data": scores[HDUname], "markLine": { "data": [{ "type": "average", "name": "平均值" }] } });
    }
  }

  for (let t of tableData)
    if (t.data.length != conts.length) {
      t.data.push(0);
    }
}

let arr = fs.readdirSync('./contests');

const legal_contests = ['vj6', 'vj8', 'vj9', 'vj10', 'vj11', 'vj12', 'hd3', 'hd4', 'hd5', 'hd6', 'hd7', 'hd8', 'hd9', 'hd10', 'nc3', 'nc4', 'nc5', 'nc6', 'nc7', 'nc8', 'nc9', 'nc10']

for (let i of arr) {
  contest_name = i.split('.')[0];
  if (!legal_contests.includes(contest_name)) {
    continue;
  }
  load(contest_name);
  console.log(i.split('.')[0], " generated.")
}

fs.writeFileSync("stat.json", JSON.stringify({
  teams: Array.from(teams),
  conts: conts,
  data: tableData,
  scores: scores,
  teamStats: teamStats
}));
