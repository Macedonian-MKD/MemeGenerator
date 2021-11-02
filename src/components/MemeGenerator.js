import React, {Component} from 'react'

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText :"",
            bottomText:"",
            randomImg :"http://i.imgflip.com/1bij.jpg",
            allImgs: []
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes").then(response=>response.json()).then(response=>{
            const {memes} = response.data
            this.setState({
                allImgs : memes
            })
            
        })
    }

    changeHandler(event){
        const {name , type, value} = event.target
        this.setState({
            [name] : value
        })
    }

    submitHandler(event){
        event.preventDefault();
        const randomNumber = Math.floor(Math.random()* this.state.allImgs.length)
        const memes = this.state.allImgs[randomNumber].url
        this.setState( prevState=>{
            return{
                ...prevState,
                randomImg : memes
            }
        })

    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.submitHandler}>
                    <input type="text" placeholder="Top Text" name="topText" value={this.state.topText} onChange={this.changeHandler}/>
                    <input type="text" placeholder="Bottom Text" name="bottomText" value={this.state.bottomText} onChange={this.changeHandler} />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="img" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}export default MemeGenerator