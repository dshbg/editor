import React, {
  Component
} from 'react';

import $ from 'jquery';

export class Danmu extends Component {
  constructor(props) {
    super(props);
    this.state={
      Info:"",
      Show:false,
      Tips:localStorage.getItem("tips") || "提醒可设置"
    };

    this.onFinshed = this.onFinshed.bind(this);
  }

  Show(data){
    if(this.state.Show) {
      return;
    }
    console.log("dafhjkdd");
    this.setState({
      Info:data,
      Show:true
    });
  }

  onFinshed(){
    this.setState({
      Show:false,Info:""
    })
  }
  componentDidUpdate(prevProps,prevState){
    if(!prevState.Show && this.state.Show) {
      setTimeout(this.onFinshed,40000);
    }
  }
  render() {
    return <div id="danmu" style={{fontSize:"0.8em",marginTop:"1em"}}>
    <strong>提醒：</strong>
    <br/><hr/>
    {this.state.Tips}<br/>
    <br/>
    {this.props.num} {" "} 字
     <div className="text-danger" style={{height:"1.5em"}}>{this.props.num >= 3000 && "可以创建新章节"}</div>
    <br/>
    <strong>
    消息：</strong><br/><hr/>
    <pre>
    {this.state.Info}
    </pre>
    <br/>
    </div>;
  }
}