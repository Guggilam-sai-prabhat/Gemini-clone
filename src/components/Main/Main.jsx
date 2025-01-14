import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const {onSent , recentPrompt,showResult,loading ,resultData ,setInput,input} = useContext(Context)
  return (
    <div className='main'>
        <div className='nav'>
        <p>Gemini</p>
        <img src = {assets.user_icon} alt='menu icon' />

        </div>
        <div className='main-container'>

        {!showResult?<>
          <div className='greet'>
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className='cards'>
            <div className='card'>
                <p>Suggest beautiful placesd to see on an upcoming trip</p>
                <img src={assets.compass_icon} alt='compass icon' />
            </div>
            <div className='card'>
                <p>Breifly summarize this concept : house planning</p>
                <img src={assets.bulb_icon} alt='compass icon' />
            </div>
            <div className='card'>
                <p>BrainStrom team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt='compass icon' />
            </div>
            <div className='card'>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt='compass icon' />
            </div>

        </div>
        </>:<div className='result'>
            <div className='"result-title'>
            <img src = {assets.user_icon} alt='user icon' />
            <p>{recentPrompt}</p>

            </div>
            <div className='result-data'>
            <img src={assets.gemini_icon} alt='loading icon' />
            {loading?<div className='loader'>
              <hr/>
              <hr/>
              <hr/>
            </div>
            :<p dangerouslySetInnerHTML = {{__html:resultData}}></p>
            }
            

            </div>
        </div>}
        
        <div className='main-bottom'>
          <div className='search-box'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Enter your prompt'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input) {
                onSent();
              }
            }}
          />
            <div>
                <img src={assets.gallery_icon} alt='search icon' />
                <img src={assets.mic_icon} alt='search icon' />
               {input? <img onClick={()=>onSent()}src={assets.send_icon} alt='search icon' />:null}
            </div>

          </div>
          <p className='bottom-info'>
          Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>

        </div>
            
        </div>
    </div>
  )
}

export default Main