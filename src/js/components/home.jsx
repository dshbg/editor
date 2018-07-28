import React, {
  Component
} from 'react';

import {
  HashRouter as Router,
  Route,
  Link,NavLink
} from 'react-router-dom';

import { Col, Input,Button } from "reactstrap";

import {IsWeb} from '../fs';

import { MainBody } from "../common";

import { fs } from "../fs";

import md5 from "js-md5";
import { Danmu } from './danmu';
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

const kTitleLine = "\r\n---标题分割线---\r\n";
const kDescribeLine = "\r\n---细纲分割线---\r\n";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile:localStorage.getItem("current_file") || "",
      title:"",
      desc:"",
      text:"",
      allDnum:parseInt(localStorage.getItem("d_num") || "0") || 0,
      goalDNum:500,
      goals:parseInt(localStorage.getItem("goals") || "10") || 10,
      finishedGoals:this.getFinshedGoals()
    };
    this.onInput = this.onInput.bind(this);
    this.setFile = this.setFile.bind(this);
    this.Save = this.Save.bind(this);
    this.Open = this.Open.bind(this);
    this.Create = this.Create.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.Check = this.Check.bind(this);
    this.numberOfAll = this.numberOfAll.bind(this);
    this.numberOfText = this.numberOfText.bind(this);
    
    this.onOpen();
    this.lastTime = this.getTime();
  }

  getTime(){
 return parseInt((new Date().getTime())/1000)
  }

  getFinshedGoals(){
    var num =  parseInt(localStorage.getItem("finished") || "0") || 0;
    var day = localStorage.getItem("save_day");

    var today = new Date().toLocaleDateString();

    if(day == today) {
      return num;
    }

    localStorage.setItem("save_day",today);
    localStorage.setItem("finished",0);
    return 0;
//    getFinshedGoals
  }

  onOpen(){
    if(this.state.currentFile != "") {
      let buff = fs.readFileSync(this.state.currentFile);
      let data = buff.toString();
      let tmpList = data.split(kTitleLine);
      if(tmpList.length == 2) {
        this.state.title = tmpList[0];
      let tmpList2 = tmpList[1].split(kDescribeLine);
      if(tmpList2.length == 2) {
        this.state.desc = tmpList2[0];
        this.state.text = tmpList2[1];
      }
      }

      this.lastNumber = this.numberOfAll();
    }
  }

  numberOfAll(){
    let tmp = this.state.text + this.state.desc;

    tmp = tmp.replace(/\r/g,"");
    tmp = tmp.replace(/\n/g,"");
    tmp = tmp.replace(/ /g,"");

    return tmp.length;
  }

  numberOfText(){
    let tmp = this.state.text +"";
    tmp = tmp.replace(/\r/g,"");
    tmp = tmp.replace(/ /g,"");
    tmp = tmp.replace(/[a-z|0-9]/g,"");
    //tmp = tmp.replace(/\n/g,"");
    return tmp.length;    
  }

  //fs.readFileSync(path[, options])
  //fs.writeFile(file, data[, options], callback)
  //

  componentDidMount(){
    this.timeId = setInterval(this.Save,20*1000);

    document.body.style.fontSize="30px";
    document.body.style.fontFamily="汉仪粗圆简";
  }

  Check(){
    var num = this.numberOfAll();
   
    console.log(this.state.allDnum,num,this.lastNumber)
    this.state.allDnum = (this.state.allDnum || 0) + num - this.lastNumber;

    this.lastNumber = num;

    console.log(this.state.allDnum);

    if(this.state.allDnum >= this.state.goalDNum) {

    var now = this.getTime();
    var during = (now - this.lastTime);

    this.lastTime = now;
    this.state.allDnum = 0;

    var mm = parseInt(during/60);
    var ss = parseInt(during%60);
    this.state.finishedGoals = this.state.finishedGoals+1;
    var lastGoals = this.state.goals - this.state.finishedGoals;

    localStorage.setItem("finished",this.state.finishedGoals);

    var speed = parseInt(this.state.goalDNum*3600/during);

    if(speed > 1000 && speed <10000) {
      speed = parseInt(speed/10)/100 + "千";
    } else if (speed > 10000) {
      speed = parseInt(speed/100)/100 + "万";
    }

    if(lastGoals <= 0) {
    this.refs["danmu"].Show(`全部完成！\n耗时：${mm}分 ${ss}秒\n速度:${speed}/时`);
    } else {
      this.refs["danmu"].Show(`完成第 ${this.state.finishedGoals} 个小目标！\n剩余：${lastGoals} 个\n耗时：${mm}分 ${ss}秒\n速度：${speed}字/时`);
    }
    }
  }

  componentWillUnmount(){
    clearInterval(this.timeId);
  }

  Save(){
    this.saveOk = false;
    let result = this.state.title + kTitleLine + this.state.desc+ kDescribeLine + this.state.text;

    result = result.replace(/\r/ig,"");

    result = result.replace(/\n/ig,"\r\n");
    console.log("save:", result);
    if(this.state.currentFile == "" && (!IsWeb()) && !this.dialogIsOpen)  {

      if(this.state.title == "" && this.state.desc == "" && this.state.text == "") {
        this.saveOk = true;
        return;
      }

      this.dialogIsOpen = true;
      let {dialog} = require("electron").remote;
      console.log(dialog);
     dialog.showSaveDialog({
        title:"选择文件保存",
        filters:[{
          name:"text",
          extensions:["txt"]}
        ]
      },this.setFile);
//      alert("请点击【保存】按钮，选择文件后再保存");
      //this.refs["file"].click();
    } else if(this.state.currentFile != "") {
      let currentMd5 = md5(result);
      if (this.lastMd5 == currentMd5){
        console.log("same");
        this.saveOk = true;
        return;
      }
      this.lastMd5 = currentMd5;
      fs.writeFile(this.state.currentFile,result,function(){console.log(arguments)});
      this.saveOk = true;
    }
  }

  onInput(e) {
    console.log(e.target.name);
    this.setState({
    [e.target.name]:e.target.value
    });
    console.log(this.state);
    this.Check();
    //fs.writeFile("./tmp.txt", result, function () { console.log(arguments) });
  }

  setFile(filename = ""){
    if(filename!="") {
      localStorage.setItem("current_file",filename);
      this.state.currentFile = filename;
      this.setState({currentFile:filename});
      this.Save();
    }

    this.dialogIsOpen = false;
  }

  Open(){
    this.Save();
    if(this.saveOk) {
      if((!IsWeb()) && !this.dialogIsOpen)  {
        this.dialogIsOpen = true;
        let {dialog} = require("electron").remote;
        console.log(dialog);
       dialog.showOpenDialog({
          title:"选择文件打开",
          filters:[{
            name:"text",
            extensions:["txt"]}
          ]
        },(function(filename=[]){
          console.log(filename);
          if(filename.length == 0) {
            this.dialogIsOpen = false;
            return;
          }
          if(filename[0] == "") {
            this.dialogIsOpen = false;
            return;
          }
          this.state.currentFile = filename[0];
          this.onOpen();
          this.forceUpdate();
          this.dialogIsOpen = false;

        }).bind(this));
    }
  } else {
    alert("请稍后等待保存当前文档完毕后重试");
  }
}

  Create(){
    this.Save();

    if(this.saveOk) {
      this.lastNumber = 0;
    this.setState({
      currentFile:"",
      title:"",
      desc:"",
      text:""
    });
    localStorage.setItem("current_file","");
  } else {
    alert("请稍后等待保存当前文档完毕后重试");
  }
  }

  render() {
    return (
      <MainBody>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Input style={{ marginBottom: "5px", flexGrow: 0 ,backgroundColor:"transparent"}} onChange={this.onInput} name="title" ref="title" value={this.state["title"]} />
        <Input type="textarea" style={{ marginBottom: "5px", flexGrow: 6 ,backgroundColor:"transparent"}} onChange={this.onInput} name="text" ref="text" value={this.state["text"]} className="input-area"/>
        <Input type="textarea" style={{ flexGrow: 2,backgroundColor:"transparent" }} onChange={this.onInput} name="desc" ref="desc" value={this.state["desc"]} className="input-area"/>
        </div>
        <div>
        <div className="btn-group-vertical" >
        <Button outline color="primary" onClick={this.Create}>新建</Button>
        <Button outline color="primary" onClick={this.Open}>打开</Button>
        <Button outline color="primary" onClick={this.Save}>保存</Button>
      </div>
        <Danmu ref="danmu" num={this.numberOfText()}/>
        </div>
      </MainBody>
    );
  }
}