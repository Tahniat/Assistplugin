"use strict";

let showWidget = false;
let keyboardNavigation = false;
let highlightfocus = false;
let readPage = 0;
let contrast = 0;
let defaultElementsStyles = [];
let highlighLinks = false;
let defaultLinksStyles = [];
let textal = false;
let righttextal =false;
let centertextal = false;
let highlighttitles = false;
let defaulthighlight = [];
let fontSize = 0;
let letterspacing = 0;
let mylineheight = 0;
let wordspacing = 0;
let cursorOption = 0;
let defaultElementsCursors = [];
let legibleFonts = 0;
let showPageStructure = false;
let fetchAllHeadingsFlag = false;
let fetchAllLinksFlag = false;
let visualpreset = false;
let hearingpreset = false;
let physicalpreset = false;
let cognitivepreset = false;
let pageStructureTab = 0;
let widgetEnabled = 0;
let hideUnhide = false;
let mycounterval = 1;
let mycountervalone = 2;
let mycountervaltwo = 12;
let selectedPosition = 3;
let mydarkcontrast = 0;
let widgetHideUnhide = '';
let mylightcontrast = 0;
let mymonochrome = 0;
let myhighcontrast = 0;
let myredcolor = 0;
let myyellowcolor = 0;
let mybluecolor = 0;
let mygreencolor = 0;
let mypinkcolor = 0;
let myorangecolor = 0;
let myblackcolor = 0;
let mypurplecolor = 0;
let mymutesounds = 0;
let mystopanimation = 0;
const available_voices = window.speechSynthesis.getVoices();
let english_voice = '';

const serverURL = 'https://citymaasassistweb.uksouth.cloudapp.azure.com/useruipreference';

let utter = new SpeechSynthesisUtterance();

! function setVoice() {
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '') {
        english_voice = available_voices[0];
    }
    window.speechSynthesis.cancel();
}();

! function init() {
    const mainWidget = `
    <html>
    <body>
    <style>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    }
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        height: 650px;
        width: 600px;
        border-radius: 0.5rem;
    }
    .close-button {
        cursor: pointer;
        font-size: 30px;
        color: #ffffff;
        margin-top: -5px;
    }
    .show-modal {
        z-index: 1;
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    .button {
        position: absolute;
        width: 90px;
        height: 122px;
        left: 105px;
        top: 200px;
        background: #FFFFFF;
        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
        border-radius: 8px;
        }

    body {font-family: Metropolis, Helvetica, sans-serif;}
* {box-sizing: border-box;}



#option-searchInput {
    margin-top:10px;
    font-size: 16px;
    border-radius:8px;
    width: 389px;
    height:53px;
    outline:none;
    border: none;
    font-family:Inter;
    background:#FCFCFC;
    background-image:url('magnifier.png');
    background-repeat:no-repeat;
    background-position:right;
    padding:15px;
    color:#101010;
  } 
  

  #option-resultsList{
      width:389px;
      height:30px;
      position:relative;
      z-index:9999;
      padding:0px;
      border-radius:8px;
  }


  .option-resultItem{
      background: #fdfdfd;
      border-radius:3px;
        padding:10px;
        text-align: left;
        white-space: normal;
        font-style: inter;
  }
  

  .option-resultSnippet a{
      color:#443328;
  }
.option-container {
  border-radius: 5px;
  padding-top:10px;
  margin-left:20px;
} 

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 25px;
    top:2px;
    left:20px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    -webkit-transition: .4s;
    transition: .4s;
    border: 1px solid #EFEFEF
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 19px;
    width: 17px;
    left: 4px;
    bottom: 2px;
    background-color: grey;
    -webkit-transition: .4s;
    transition: .4s;
    background-image: url(checker.png);
    background-repeat: no-repeat;
    background-position: left;
    padding-left:1px;
  }
  
  input:checked + .slider {
    background-color: #18FF9E;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #808080;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 12px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }

  .dropbtn {
    background-color: #FFFFFF;
    color:#424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    font-weight:500;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:420px;
    margin-left:20px;
    border-radius:8px;
  }
  
  .show {display: block;}

  .dropbtntwo {
    background-color: #FFFFFF;
    color: #424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    margin-top:10px;
    font-weight: 500;
  }
  
  
  
  .dropdowntwo {
    position: relative;
    display: inline-block;
  }
  
  .dropdowntwo-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:300px;
    margin-left:20px;
    border-radius:8px;
  }
  
  
  .show {display: block;}

  .dropbtnthree {
    background-color: #FFFFFF;
    color: #424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    margin-top:10px;
    font-weight: 500;
  }
  
  .dropdownthree {
    position: relative;
    display: inline-block;
  }
  
  .dropdownthree-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:308px;
    margin-left:20px;
    border-radius:8px;
  }
  
  .show {display: block;}

.dropbtnfour {
    background-color: #FFFFFF;
    color:#424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    font-weight:500;
  }
  
  .dropdownfour {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-contentfour {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:420px;
    margin-left:20px;
    border-radius:8px;
  }
  
  .show {display: block;}


  input[type=color]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
  padding: 0;
}


input[type=color]::-webkit-color-swatch-wrapper {
    border: none;
    border-radius: 50%;
    padding: 0;
}

   
            .mymodel-bg
            {
                position:fixed;
                display: flex;
                height:80vh;
                margin-left:20px;
                margin-top:10px;
                justify-content: center;
                align-items: center;
                visibility:hidden;
                opacity:0;
                transition: transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
                opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);  
                z-index:10000;
            }
            .mymodel
            {
               position: relative;
                width: 389px;
                height:610px;
                border-radius:8px; 
               background:#FCFCFC;
               border: 1px solid #F3F3F3;
            }

            .bg-active
            {
            visibility: visible;
            opacity: 1;
            }
            .mymodel-close
            {
                position:absolute;
                top:10px;
                right:10px;
                font-weight:bold;
                cursor: pointer;
            }
            
              .contentslider {
                -webkit-appearance: none;
                width: 70%;
                height: 10px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
              }
              
              .contentslider:hover {
                opacity: 1;
              }
              
              .contentslider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 23px;
                height: 24px;
                border: 0;
                background: url('ellipse.png');
                background-repeat: no-repeat;
                cursor: pointer;
              }

              .contentbutton {
                background-color: #FFFFFF; 
                border: none;
                color: black;
                width:25px;
                height:25px;
                border-radius:50%;
                cursor: pointer;
                background:url('minus.png');
                background-repeat: no-repeat;
                outline:none;
                display: inline-block;
              }

              .contentbuttontwo {
                background-color: #FFFFFF; 
                border: none;
                color: black;
                padding:10px;
                width:27px;
                height:27px;
                border-radius:50%;
                cursor: pointer;
                background:url('plus.png');
                background-repeat: no-repeat;
                outline:none;
                display: inline-block;
              }

              .myusermodel-bg
            {
                position:fixed;
                display: flex;
                height:10vh;
                justify-content: center;
                align-items: center;
                visibility:hidden;
                opacity:0;
                transition: transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
                opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
                margin-left:180px;  
            }
            .myusermodel
            {
               position: relative;
                width:200px;
                height:70px;
                border-radius:4px; 
               background:#FFFFFF;
               border: 1px solid #F3F3F3;
            }

            .userbg-active
            {
            visibility: visible;
            opacity: 1;
            }
            .myusermodel-close
            {
                position:absolute;
                top:10px;
                right:10px;
                font-weight:bold;
                cursor: pointer;
            }

            a.highlight:hover {
                color: #000000;
                background-color:yellow;
              } 
            
    </style>
        <div id='widget-window-cursor'
        style='display: none; background: #000; min-width: 100% !important; position: absolute!important; height: 12px!important; border: solid 3px #fff300; border-radius: 5px; z-index: 2147483647;'>
        </div>
        <div id='widget-window'
        style='margin-top: 50px; position:absolute; z-index: 10001;  display: flex; justify-content: flex-start; font-family: sans-serif; left: 2px; bottom: 0px;'>
            <div id='widget-main-div-both-container' style='display: flex; flex-direction: row-reverse; align-items: flex-end'>
                <div id="main-widget-container-move" style="text-align: center;overflow: auto; margin-top: 10px; user-select: none; display: none; height: 600px; width: 350px; background-color: #fdfcfc; border-radius: 10px; border: 1px solid #d4d4d4;">
            </div>
            <div id='main-widget-container'
                style='margin-top: 10px;user-select:none; display: none; height:650px; width:437px; background-color:#F8F8FB; border-radius: 15px;border: 1px solid #d4d4d4;'>
                <div
                id='container-1'
                style=' width: 437px; height:380px; border-radius:8px;background: linear-gradient(67.65deg, #4A2972 1.41%, #7737A9 96.89%)!important;'>    
                <img id='option-1-image' style='cursor: pointer; margin-top:25px; margin-left:10px; height: 20px;' src='arrow.png' /> 
                <img id='option-2-image' style='cursor: pointer; width: 32px;margin-top:25px;margin-left:65px;height: 17px;' src ='citylogo.png'/>
                    <img id='option-2-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='c.png'/>
                    <img id='option-3-image' style='cursor: pointer; margin-top:25px; height: 16.72px;' src ='i.png' />
                    <img id='option-4-image' style='cursor: pointer; margin-top:25px;width: 14.61px; height: 16.72px;' src ='t.png' />
                    <img id='option-5-image' style='cursor: pointer; margin-top:25px;width: 14.61px; height: 16.72px;' src ='y.png' />
                    <img id='option-6-image' style='cursor: pointer; margin-top:25px; margin-left:10px;width: 14.61px; height: 16.72px;' src ='m.png' />
                    <img id='option-7-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='a.png' />
                    <img id='option-8-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='capital a.png' />
                    <img id='option-9-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='s.png' />
                    <button class="modal-btn" style="background-image:url(Group.png);background-repeat: none;width:20px;
                    height:20px; outline: none; border: none;cursor: pointer;margin-left:40px;"></button>
                    <div class="mymodel-bg">
                         <div class="mymodel">
                         <span class="mymodel-close">X</span>
                         <p pid="heading" style="position: absolute;width: 322px;height: 28px;left:45px;top:40px;font-family: Inter;font-style: normal;font-weight: bold;font-size: 25px;line-height: 28px;color: #000000;";>Choose the desired Language</p>
                         <div id='option-1' 
                         style='position: absolute;
                         width: 108px;
                         height: 60px;
                         left: 75px;
                         top:120px;
                         background:#FFFFFF;
                         box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                         border-radius: 8px;'>
                         <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/us/flat/32.png' />
                         <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                         font-style: normal;
                         font-weight: bold;
                         font-size: 10px;
                         line-height: 11px;
                         text-align: center;
                         letter-spacing: 0.5px;
                         text-transform: uppercase;
                         margin-top: 0px;
                         color: #4B4B4B';>English</p>
                         </div>
                         <div id='option-2' 
                         style='position: absolute;
                         width: 108px;
                         height: 60px;
                         left: 210px;
                         top:120px;
                         background:#FFFFFF;
                         box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                         border-radius: 8px;'>
                         <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;" src='https://www.countryflags.io/ru/flat/32.png' />
                         <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                         font-style: normal;
                         font-weight: bold;
                         font-size: 10px;
                         line-height: 11px;
                         text-align: center;
                         letter-spacing: 0.5px;
                         text-transform: uppercase;
                         margin-top: 0px;
                         color: #4B4B4B';>RUSSIA</p>
                         </div>

                         <div id='option-3' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left:75px;
                                 top:210px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/il/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Hebrew</p>
                                 </div>

                                 <div id='option-4' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:210px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/pt/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Portugues</p>
                                 </div>   

                                 
                                 <div id='option-5' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 top:300px;
                                 left:75px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/de/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Deutsch</p>
                                 </div>

                                 <div id='option-6' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:300px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/it/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Italiano</p>
                                 </div>

                                 <div id='option-7' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left:75px;
                                 top:390px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/ae/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Arabic</p>
                                 </div>

                                 <div id='option-8' 
                                     style='position: absolute;
                                     width: 108px;
                                     height: 60px;
                                     left:210px;
                                     top:390px;
                                     background:#FFFFFF;
                                     box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                     border-radius: 8px;'>
                                     <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/cn/flat/32.png' />
                                     <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                     font-style: normal;
                                     font-weight: bold;
                                     font-size: 10px;
                                     line-height: 11px;
                                     text-align: center;
                                     letter-spacing: 0.5px;
                                     text-transform: uppercase;
                                     margin-top: 0px;
                                     color: #4B4B4B';>Chinese</p>
                                     </div>

                                     <div id='option-9' 
                                     style='position: absolute;
                                     width: 108px;
                                     height: 60px;
                                     top:480px;
                                     left:75px;
                                     background:#FFFFFF;
                                     box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                     border-radius: 8px;'>
                                     <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/in/flat/32.png' />
                                     <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                     font-style: normal;
                                     font-weight: bold;
                                     font-size: 10px;
                                     line-height: 11px;
                                     text-align: center;
                                     letter-spacing: 0.5px;
                                     text-transform: uppercase;
                                     margin-top: 0px;
                                     color: #4B4B4B';>Hindi</p>
                                     </div>

                                     <div id='option-10' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:480px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/jp/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Japanese</p>
                                 </div> 
                              
                      </div>
                 </div> 

                 <script>

                 var modalBtn=document.querySelector('.modal-btn');
                 var modalBg=document.querySelector('.mymodel-bg');
                 var modalClose=document.querySelector('.mymodel-close');
                 modalBtn.addEventListener('click',function(){
                     modalBg.classList.add('bg-active');
                 });
                 modalClose.addEventListener('click',function(){
                     modalBg.classList.remove('bg-active');
                 });
                 </script>
                 <button class="mymodal-btn" style="background-image:url(person.png);background-repeat: none;width:20px;
                 height:20px; outline: none; border: none;border-radius:50%;cursor: pointer;margin-left:20px;"></button>
                 <div class="myusermodel-bg">
                <div class="myusermodel">
                <span class="myusermodel-close"></span>
                <p id="secondmodal" style="margin-top:10px; margin-left:12px;margin-bottom: 0px;font-family: Inter;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;">Login for personalised view</p>
                <img src ='facebook.png' style= "margin-left:15px;margin-top:5px;width:30px;border-radius:4px;cursor: pointer;";>
                <img src ='twitter.png' style= "margin-left:5px;width:30px;border-radius:4px;cursor: pointer;";>
                <img src ='anothergoogle.png' style= "margin-left:5px;width:30px;border-radius:4px;cursor: pointer;";>
                <img src ='linkedin.png' style= "margin-left:5px;width:30px;border-radius:4px;cursor: pointer;";>
                </div>
                </div>

                <script>

                    var mymodalBtn=document.querySelector('.mymodal-btn');
                    var mymodalBg=document.querySelector('.myusermodel-bg');
                    var mumodalClose=document.querySelector('.myusermodel-close');
                    mymodalBtn.addEventListener('click',function(){
                        mymodalBg.classList.add('userbg-active');
                    });
                    mymodalClose.addEventListener('click',function(){
                        mymodalBg.classList.remove('userbg-active');
                    });
                    </script>

                <div class="option-container" id='option-dictionary'>
                <div id="option-primaryContent" class="group">
                <form id="option-searchForm">
                <input id="option-searchInput" type="text" autocomplete="off" placeholder="Search Dictionary...">
                <div id="option-resultsList">
                <div id ="option-containerpre" style ='margin-top:15px;'>
                <h id ='para-1' style='color:white;font-family:"Inter";margin-left:2px;margin-top:18px;font-weight:600px; font-size:18px;width: 170px;line-height:16px;'>Preset Configurations </h> 
                </div>
                </div> 
                </form>
                </div> 
                </div>
                 <script src="script.js"></script>
                 <div id='option-presetvisual'  
                            style='position: absolute;
                            width: 90px;
                            height: 122px;
                            left: 115px;
                            top: 185px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;cursor:pointer;'>
                            <img id='option-1-image' style='cursor: pointer; margin-top:20px; margin-left:30px; height: 20px;' src='Frame.png' />
                            <div>
                            <h id='para-1' style='color: black !important; cursor: pointer; margin-left:25px;margin-top:15px; position:absolute;font-family: "Inter"'> Visual </h>
                            </div>
                            <label class="switch" id='option-cognitivelabel' style ='position:absolute; margin-top:89px;' >
                            <input type="checkbox" id ="hello">
                            <span id="option-visualprofile" class="slider round" onclick="onClickOption1()"></span>
                            </label>
                            </div>   

                        <div id='option-presethearing' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 215px;
                        top: 185px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-2-image' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='ear.png' />
                        <div>
                        <h id='para-2' style='color: black !important; cursor: pointer;margin-left:22px;margin-top:15px; position:absolute;font-family: "Inter"'> Hearing </h>
                        </div>
                        <label class="switch"  id='option-hearinglabel' style ='position:absolute; margin-top:89px;'>
                        <input type="checkbox">
                        <span id ="option-hearingslider" class="slider round" onclick="onClickOption2()"></span>
                        </label>
                        </div>   

                        <div id='option-presetphysical' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 315px;
                        top: 185px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-3-image' style='cursor: pointer; margin-top:20px; margin-left:35px; height: 20px;' src='hand.png' />
                        <div>
                        <h id='para-3' style='color: black !important; cursor: pointer;margin-left:22px;margin-top:15px;position:absolute;font-family: "Inter"'> Physical </h>
                        </div>
                        <label class="switch"  id='option-physicallabel' style ='position:absolute; margin-top:89px;'>
                        <input type="checkbox">
                        <span id ="option-physicalprofile" class="slider round" onclick="onClickOption3()"></span>
                        </label>
                        </div>   
                        
                        <div id='option-presetcognitive' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 415px;
                        top: 185px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-4-image' style='cursor: pointer; margin-top:20px; margin-left:35px; height: 20px;' src='brain.png' />
                        <div>
                        <h id='para-4' style='color: black !important; cursor: pointer;margin-left:18px;margin-top:15px;position:absolute;font-family: "Inter"'> Cognitive </h>
                        </div>
                        <label class="switch" id='option-cognitivelabel' style ='position:absolute; margin-top:89px;'>
                        <input type="checkbox">
                        <span id ="option-cognitiveslider" class="slider round" onclick="onClickOption4()"></span>
                        </label>
                        </div>  

                        <div id = 'option-anotherpara' style= 'margin-top:145px; margin-left:20px;'>
                        <h id = 'para-profileselection' style='color:white;font-family:"Inter";font-weight:600px;font-size:16px;line-height:16px;'>You can select any of the configurations depending upon the necessity and disability.</h> 
                        </div>
                        <h id = 'para-visual' style='display:none;color:white;font-family:"Inter";margin-left:20px;margin-top:135px;font-weight:600px; font-size:16px;line-height:16px;'>These are mostly the presets for assisting color blind individuals but can also be used for other visually impaired people.</h> 
                        <h id = 'para-hearing' style='display:none;color:white;font-family:"Inter";margin-left:20px;margin-top:135px;font-weight:600px; font-size:16px;line-height:16px;'>These are mostly the presets for assisting individuals who are suffering hearing issues.It shows transcript for video assets.</h> 
                        <h id = 'para-physical' style='display:none;color:white;font-family:"Inter";margin-left:20px;margin-top:135px;font-weight:600px; font-size:16px;line-height:16px;'>These are mostly the presets for assisting motor impaired persons to operate website using keyboard hot keys.</h> 
                        <h id = 'para-cognitive' style='display:none;color:white;font-family:"Inter";margin-left:20px;margin-top:135px;font-weight:600px; font-size:16px;line-height:16px;'>These are mostly the presets for assisting with reading and focusing.</h> 
                        
                        <div class="dropdown" id='option-dropdowncontainer' style='margin-top:20px;'>
                        <button onclick="myFunction()" class="dropbtn" id='option-contentbutton'>Content Adjustments<span id ='option-drop'><img id='option-dropdown' src="spin.png" style="margin-left:150px;";><img id='option-cancel'src="downwardarrow.png" style="margin-left:20px; display:inline;"></span></button>
                        <div id="option-myDropdown" class="dropdown-content">
                        <div id = "option-paracontainer" style='margin-left:15px; margin-top:20px;'>
                        <h id ='para-contentbutton' style = 'font-family:Inter; font-style: normal;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 16px;
                        color: #8F91AC;'>All the adjustments of textual elements of webpage can be done from here.</h>
                        </div>
                        <div id ='option-fontadjustment' style= 'margin-left:15px; margin-top:5px;'>
                        <h id ='para-adjustment' style='color:#4B4B4B!important;font-size:16px;letter-spacing:0.5px;text-transform: uppercase;
                        font-weight: bold;'>Font Adjustment</h>
                        </div>
                        <div id='option-sliderdisplay'>
                        <h id ="para-slidervalue" style="font-size:12px;margin-top:5px;margin-left:150px; margin-bottom:0px;color: #4B4B4B;">+<span id="option-demo"></span>%</h>
                        </div>
                        <img src='minus.png' id='option-decreasefont' style='margin-left:30px;cursor:pointer;'>
                        <input type="range" min="0" max="100" value="0" class="contentslider" style="margin-left:5px; margin-top:0px;" id="myRange">
                        <img src="plus.png" id='option-increasefont' style='cursor:pointer;'>
                        
                        <script>
                            var slider = document.getElementById("myRange");
                            var output = document.getElementById("option-demo");
                            output.innerHTML = slider.value;
                            slider.oninput = function() {
                            output.innerHTML = this.value;
                            var myval = parseInt(this.value);
                            let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
                            let index = 0, length = elems.length;
                            for (; index < length; index++) {
                                elems[index].style.fontSize = myval;
                            }
                            }
                        </script>   
                        <div id='option-contentbuttonone' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:130px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id='option-parareadable'style='margin-top:13px;color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'>
                        <h id = 'para-readable'>Readable font</h>
                        </div>
                        <label class="switch" id ="option-uncheckedswitch" style='margin-top:5px;'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderreadable' onclick="onClickReadablefont()"></span>
                        </label>
                        <label class="switch" id="checkedswitch" style="display:none;">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                        </label>
                        </div>

                        <div id='option-contentbuttontwo' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:130px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-paraemphasis' style='margin-top:13px;color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'>
                        <h id ='para-emphashis'>Emphasis Titles</h>
                        </div>
                        <label class="switch" id='option-switchtitle' style='margin-top:5px;'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-slideremphasistitle' onclick="onClickOption6()"></span>
                        </label>
                        </div>

                        <div id='option-contentbuttonthree' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:130px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-paralinks' style='margin-top:13px;color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'>
                        <h id ='para-links'>Emphasis Links</h>
                        </div>
                        <label class="switch" id='option-switchlinks' style='margin-top:5px;'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-slideremphasislinks' onclick="onClickHighlightLinks()"></span>
                        </label>
                        </div>

                        <div id='option-contentbuttonfour' onclick="onClickOption5()"
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:220px;
                        cursor:pointer;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-leftalignimage' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='leftalign.png' />
                        <div id ='option-leftalignpara' style='margin-top:10px;'>
                        <h id='para-leftalign'style='color: black !important; cursor: pointer;margin-left:15px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Left Align </h>
                        </div>    
                        </div>

                        <div id='option-contentbuttonfive' onclick = "rightAlignfunction()"
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        cursor:pointer;
                        left:140px;
                        top:220px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-rightalignimage' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='rightalign.png' />
                        <div id ='option-rightalignpara' style='margin-top:10px;'>
                        <h id ='para-rightalign' style='color: black !important; cursor: pointer;margin-left:15px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Right Align </h>
                        </div>    
                        </div>

                        <div id='option-contentbuttonsix' onclick ="CenterAlignfunction()"
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:220px;
                        cursor:pointer;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='centeralignimage-image' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='centeralign.png' />
                        <div id ='option-centeralignpara' style='margin-top:10px;'>
                        <h id='para-centeralign' style='color: black !important; cursor: pointer;margin-left:8px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Center Align </h>
                        </div>    
                        </div>

                        <div id='option-contentbuttonseven' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:310px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id = 'option-contentseven' style='margin-top:10px;margin-left:15px;'>
                        <h id = 'para-wordspacing' style='color: black !important; cursor: pointer;font-size:11px;letter-spacing: 0.5px; text-align:center;font-family: "Inter";text-transform:uppercase;'> Adjust Word Spacing </h>
                        </div>
                        <button class="contentbutton" id='option-increaseword' onclick="decreasewordspacing()" style="margin-top:10px; margin-left:4px;"><span id ="option-wordspan" style='margin-left:25px; margin-bottom:10px;font-size:14px;margin-right:10px;'>+1%</span></button>
                        <button class ="contentbuttontwo" id='option-decreaseword' onclick="increasewordspacing()" style="margin-left:40px;"></button>
                        </div>

                        <div id='option-contentbuttoneight' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:310px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id='option-contenteight' style='margin-top:10px;margin-left:10px;'>
                        <h id='para-letterspacing'style='color: black !important; cursor: pointer;font-size:11px;letter-spacing: 0.5px; text-align:center;font-family: "Inter";text-transform:uppercase;'> Adjust Letter Spacing </h>
                        </div>
                        <button class="contentbutton"  id='option-increaseletter' onclick="decreaseletterpacing()" style="margin-top:10px; margin-left:4px;"><span id ='option-letterspan' style='margin-left:25px; margin-bottom:10px;font-size:14px;margin-right:10px;'>+2%</span></button>
                        <button class ="contentbuttontwo" id='option-decreaseletter' onclick="increaseletterspacing()" style="margin-left:40px;"></button>
                        </div>

                        <div id='option-contentbuttonnine' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:310px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id='option-contentnine' style='margin-top:10px;margin-left:10px;'>
                        <h id='para-lineheight' style='color: black !important; cursor: pointer;font-size:11px;letter-spacing: 0.5px; text-align:center;font-family: "Inter";text-transform:uppercase;'> Adjust Line Height </h>
                        </div>
                        <button class="contentbutton" id='option-decreaseline' onclick="decreaselineheight()"style="margin-top:10px; margin-left:4px;"><span id ='option-heightspan' style='margin-left:30px; margin-bottom:10px;font-size:14px;margin-right:10px;'>12</span></button>
                        <button class ="contentbuttontwo" id='option-increaseline' onclick ="increaselineheight()" style="margin-left:40px;"></button>
                        </div>

                            </div>
                            </div>
                            <script>
                            function myFunction() {
                                document.getElementById("option-myDropdown").classList.toggle("show");
                            }
                      
                      window.onclick = function(event) {
                        if (!event.target.matches('.dropbtn')) {
                          var dropdowns = document.getElementsByClassName("dropdown-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                      <div class="dropdowntwo" id='option-styledrop'>
                        <button onclick="myFunction2()" class="dropbtntwo" id='option-stylebutton'>Style Adjustments<span id='option-styleimages'><img id='spin-image' src="spin.png" style="margin-left:170px;";><img id='arrow-image' src="downwardarrow.png" style="margin-left:20px; display:inline;"></span></button>
                        <div id="option-mytwoDropdown" class="dropdowntwo-content">
                        <div id='option-style1' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 20px;
                            top: 40px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <img id='highsat' style='cursor: pointer; margin-left:85px;margin-top:0px;height:20px;display:none;position:absolute;margin-bottom:0px;padding:0px;' src='Rectangle 541.png' />
                            <div id='option-parasaturation' style='margin-top:15px;margin-left:5px;text-align:center;'>
                            <h id='para-highsaturation' style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> High Saturation </h>
                            </div>
                            </div>   

                            <div id='option-style2' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 145px;
                            top: 40px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;' onclick="ONCLICKhighcontrast()">
                            <div id='option-paracontrast' style='margin-top:15px;margin-left:5px;text-align:center;'>
                            <h id = 'para-highcontrast' style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> High Contrast </h>
                            </div>
                            </div>

                            <div id='option-style3' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 265px;
                            top: 40px;
                            cursor:pointer;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;' onclick ="onclickdarkcontrast()">
                            <div id ='option-darkcont' style='margin-top:15px;margin-left:5px;text-align:center;'>
                            <h id ='para-darkcontrast' style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> Dark Contrast </h>
                            </div>
                            </div>  

                            <div id='option-style4' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 20px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;' onclick = "onclicklightcontrast()">
                            <div id='option-lightcont' style='margin-top:15px;margin-left:5px;text-align:center;'>
                            <h id = 'para-lightcont' style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> Light Contrast </h>
                            </div>
                            </div>  

                            <div id='option-style5' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 145px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;' onclick= "onclickmonochrome()">
                            <div id ='option-mono' style='margin-top:15px;margin-left:11px;text-align:center;'>
                            <h id ='para-monochrome' style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> Mono Chrome </h>
                            </div>
                            </div> 

                            <div id='option-style6' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 265px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <div id='option-invert' onclick = "onclickinvertcolors()" style='margin-top:15px;margin-left:10px;text-align:center;'>
                            <h id='para-invertcolor'style='color:black !important;cursor:pointer;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform:uppercase; font-weight:bold;'> Invert Colors </h>
                            </div>
                            </div> 
                            <div id = "option-textcolor" style="margin-top:200px;margin-left:30px;">
                            <h id ="para-colors" style="font-family: Inter;
                            font-style: normal;
                            font-weight: bold;
                            font-size: 12px;
                            line-height: 19px;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            color: #4B4B4B;">Text Title Colors</h>
                            </div>
                            <img src='red.png' id='red-image' style= 'margin-left:40px;margin-top:10px;cursor:pointer;' onclick = "onclickRedColor()">
                            <img src ='yellow.png' id='yellow-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickYellowColor()">
                            <img src ='blue.png' id='blue-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickBlueColor()" >
                            <img src ='green.png' id='green-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickGreenColor()">
                            <img src ='pink.png' id='pink-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickPinkColor()">
                            <img src ='orange.png' id='orange-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickOrangeColor()">
                            <img src ='black.png' id='black-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickBlackColor()">
                            <img src ='purple.png' id='purple-image' style= 'margin-left:10px;cursor:pointer;' onclick = "onclickPurpleColor()">
                            </div>
                            </div>
                            <script>
                            function myFunction2() {
                                document.getElementById("option-mytwoDropdown").classList.toggle("show");
                            }
                      
                      window.onclick = function(event) {
                        if (!event.target.matches('.dropbtntwo')) {
                          var dropdowns = document.getElementsByClassName("dropdowntwo-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                        <div class="dropdownthree" id='option-navigation'>
                        <button onclick="myFunction3()" class="dropbtnthree" id='option-navigationbutton'>Navigation Adjustments<span id='option-navigate'><img id='spinnav-image' src="spin.png" style="margin-left:130px;";><img id='navarrow-image' src="downwardarrow.png" style="margin-left:20px; display:inline;"></span></button>
                        <div id="option-mythreeDropdown" class="dropdownthree-content">

                        <div id='option-nav1' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-screen' style='margin-left:0px; margin-top:15px;text-align:center;'>
                        <h id='para-screen'style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Screen Reading Guide </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-rg'>
                        <input type="checkbox";>
                        <span id='option-sliderrg' class="slider round" onclick="onclickReadingGuide()"></span>
                        </label>
                        </div>

                        <div id='option-nav2' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-buttonmute' style='margin-left:24px; margin-top:15px;'>
                        <h id = 'para-mute' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Mute Sounds </h>
                        </div>
                        <label class="switch" style='margin-top:5px;'id='option-ms'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderms' onclick="onclickMuteSound()"></span>
                        </label>
                        </div>

                        <div id='option-nav3' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-buttonanimation' style='margin-left:16px; margin-top:15px;'>
                        <h id = 'para-stopanimation' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Stop Animations </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-sa'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-slidersa' onclick="onclickstopanimation()"></span>
                        </label>
                        </div>

                        <div id='option-nav4' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-highlight' style='margin-left:16px; margin-top:15px;'>
                        <h id='para-hfocus' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Highlight Focus </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-hf'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderhf' onclick="onclickHighlightFocuselement()"></span>
                        </label>
                        </div>

                        <div id ='option-nav5' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-highlighthover' style='margin-left:16px; margin-top:15px;'>
                        <h id = 'para-hhover' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Highlight Hover </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-hh'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderhh' onclick="onclickhighlighthover()" ></span>
                        </label>
                        </div>

                        <div id='option-nav6' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-readingh' style='margin-left:16px; margin-top:15px;'>
                        <h id='para-readhighlight' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Reading Highlight </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-rh'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderrh' ></span>
                        </label>
                        </div>

                        <div id='option-nav7' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:200px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <div id ='option-keyboardnavigation' style='margin-left:16px; margin-top:15px;'>
                        <h id='para-keyboardnavigation' style='color: black !important; cursor: pointer;font-weight: bold;
                        font-size: 11px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B;font-family: "Inter"'> Keyboard Navigation </h>
                        </div>
                        <label class="switch" style='margin-top:5px;' id='option-kn'>
                        <input type="checkbox";>
                        <span class="slider round" id='option-sliderkn' onclick="onclickKeyboardNavigation()"></span>
                        </label>
                        </div>
                          
                         </div>
                        </div>
                           
                        <script>
                            function myFunction3() {
                                document.getElementById("option-mythreeDropdown").classList.toggle("show");
                            }
                      
                        window.onclick = function(event) {
                        if (!event.target.matches('.dropbtnthree')) {
                          var dropdowns = document.getElementsByClassName("dropdownthree-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                        <div class="dropdownfour" id='option-dropdowncontainer' style='margin-top:20px;'>
                        <button onclick="myFunction4()" class="dropbtnfour" id='option-contentbutton' style='display:none;'>Adjustments<span id ='option-drop'><img id='option-dropdown' src="spin.png" style="margin-left:150px;";><img id='option-cancel'src="downwardarrow.png" style="margin-left:20px; display:inline;"></span></button>
                        <div id="option-myfourDropdown" class="dropdown-contentfour">
                        </div>
                        </div>
                        <script>
                         function myFunction4() {
                                document.getElementById("option-myfourDropdown").classList.toggle("show");
                         }
                      
                         window.onclick = function(event) {
                         if (!event.target.matches('.dropbtnfour')) {
                         var dropdowns = document.getElementsByClassName("dropdown-contentfour");
                         var i;
                         for (i = 0; i < dropdowns.length; i++) {
                                    var openDropdown = dropdowns[i];
                                    if (openDropdown.classList.contains('show')) {
                                    openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                      
                        </div>
                        </div>



            <div style='display: flex; position: relative; margin-left: 0' id='widget-main-icon-div' >
                <img
                id='widget-main-icon-div-icon' 
                src='walkingman.png'
                style='cursor: pointer; height: 95px;' onclick="toggleWidget()" onmouseover="mouseOverWid(this)" onmouseout="mouseOutWid(this)"/>
                <div 
                    id='widget-option-main-icon'
                    style='position: absolute; display: none; width: 100%; justify-content: flex-end;'>
                    <img id='widget-main-icon-tick' src='walkingman.png' height='32px' />
                </div>
            </div>
            </div>
        </div>
    </body>
    </html>
    `;
    document.write(mainWidget);
    widgetHideUnhide = document.getElementById('hide');
    clickAwayListener();
    onMouseMoveListener();
    isPluginActive();
    document.addEventListener('keyup', doc_keyUp, false);
    resizeWindowEvent();
    addWindowResizeEvent();
    // loadPreference();
    // initializePayment();
    // openModal();
}();

function addWindowResizeEvent() {
    window.addEventListener('resize', resizeWindowEvent);
}

function resizeWindowEvent() {
    const width = window.outerWidth;
    const height = window.outerHeight;
    const linksModal = document.getElementById('widget-modal-content');
    const optionContainer = document.getElementById('main-widget-container');
    const moveHideContainer = document.getElementById('main-widget-container-move');
    const moveHideImage = document.getElementById('widget-move-options-container-image');
    const moveButtons = document.getElementById('widget-move-options-container-buttons');
    console.log(moveButtons.childNodes);
    if (width <= 670) {
        linksModal.style.width = '90%';
    } else {
        linksModal.style.width = '600px';
    }
    if (width <= 390) {
        optionContainer.style.width = '210px';
        moveHideContainer.style.width = '210px';
        moveHideImage.style.width = '90%';
        moveButtons.style.flexDirection = 'column';
        moveButtons.childNodes[1].style.width = '120px';
        moveButtons.childNodes[3].style.marginLeft = '0px';
    } else if (width <= 500) {
        optionContainer.style.width = '280px';
        moveHideContainer.style.width = '280px';
        moveHideImage.style.width = '90%';
        moveButtons.style.flexDirection = 'row';
        moveButtons.childNodes[1].style.width = '90px';
        moveButtons.childNodes[3].style.marginLeft = '15px';
    } else {
        optionContainer.style.width = '350px';
        moveHideContainer.style.width = '350px';
        moveHideImage.style.width = 'unset';
        moveButtons.childNodes[1].style.width = '120px';
    }
    console.log(height);
    if (height <= 700) {
        optionContainer.style.height = `${height - 120}px`;
        optionContainer.style.overflow = 'auto';
    } else {
        optionContainer.style.height = '600px'
        optionContainer.style.overflow = 'unset';

    }
}

async function loadPreference() {
    // const email = 'shafia@citymaas.io';
    const email = sessionStorage.getItem('email');
    if (email) {
        await fetch(serverURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(`user_email=${email}&mode=fetch`)
            // body: new URLSearchParams(`user_email=${email}&mode=fetch`)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const values = data.User_Preference[0];
                const {
                    keyboard_nav,
                    read_page,
                    contrast,
                    highlight_links,
                    font_size,
                    letter_spacing,
                    cursor_option,
                    legible_fonts,
                } = values;
                console.log(data)
                onClickOption9();
                //option 1
                if (keyboard_nav) {
                    keyboardNavigation = !keyboard_nav;
                    onClickOption1(false);
                }
                //option 2
                if (read_page) {
                    const tempValue = parseInt(read_page);
                    if (tempValue !== 0) {
                        readPage = 0;
                        runOperation(tempValue, onClickOption2);
                    }
                }
                //option 3
                if (contrast) {
                    const tempValue = parseInt(contrast);
                    if (tempValue !== 0) {
                        contrast = 0;
                        runOperation(tempValue, onClickOption3);
                    }
                }
                //option 4
                if (highlight_links) {
                    highlighLinks = !highlight_links;
                    onClickOption5(false);
                }
                //option 5
                if (font_size) {
                    const tempValue = parseInt(font_size);
                    if (tempValue !== 0) {
                        fontSize = 0;
                        runOperation(tempValue, onClickOption5);
                    }
                }
                //option 6
                if (letter_spacing) {
                    const tempValue = parseInt(letter_spacing);
                    if (tempValue !== 0) {
                        letterSpacing = 0;
                        runOperation(tempValue, onClickOption6);
                    }
                }
                //option 7
                if (cursor_option) {
                    const tempValue = parseInt(cursor_option);
                    if (tempValue !== 0) {
                        cursorOption = 0;
                        runOperation(tempValue, onClickOption7);
                    }
                }
                //option 8
                if (legible_fonts) {
                    const tempValue = parseInt(legible_fonts);
                    if (tempValue !== 0) {
                        legibleFonts = 0;
                        runOperation(tempValue, onClickOption8);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function savePreferences() {
    // const email = 'shafia@citymaas.io';
    const email = sessionStorage.getItem('email');
    if (email) {
        const params = [
            `user_email=${email}`,
            `keyboard_nav=${keyboardNavigation}`,
            `read_page=${readPage}`,
            `contrast=${contrast}`,
            // `key_nav=${keyboardNavigation}`,
            `font_size=${fontSize}`,
            `letter_spacing=${letterSpacing}`,
            `cursor_option=${cursorOption}`,
            `legible_fonts=${legibleFonts}`,
            `highlight_links=${highlighLinks}`,
            `update_time=${Math.round((new Date()).getTime() / 1000)}`,
            `mode=submit`,
        ];
        fetch(serverURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(params.join('&'))
        })
    }
}

function runOperation(tempValue, optionHandler) {
    const times = Array(tempValue).fill(0);
    times.map(() => optionHandler(false))
}

function initializePayment() {

    // const genesis = require('./config/genesis.js/lib/genesis');
    // const genesis = './config/default.json';
    console.log(window.genesis);
    console.log(window);

    // import * as genesis from './node_modules/genesis.js/lib/genesis';
    console.log(genesis);
}

function openModal() {
    fetchAllHeadings();
    const modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
    showPageStructure = !showPageStructure;
}

function clickAwayListener() {
    const widgetContainer = document.getElementById("widget-window");
    const widgetModal = document.getElementById("widget-modal");
    window.onclick = function (event) {
        if (readPage !== 0) {
            readPageText(event.target);
        }
        if (showPageStructure) {
            if (event.target == widgetModal) {
                openModal()
                showPageStructure = !showPageStructure;
            }
        } else {
            if (event.target == widgetContainer) {
                const mainWidgetContainer = document.getElementById('main-widget-container');
                mainWidgetContainer.style.display = "none";

                if (selectedPosition === 1 || selectedPosition === 3) {
                    const mainContainer = document.getElementById('widget-main-div-both-container');
                    mainContainer.style.flexDirection = 'row';
                }
                if (selectedPosition === 2 || selectedPosition === 4) {
                    const mainContainer = document.getElementById('widget-main-div-both-container');
                    mainContainer.style.flexDirection = 'row-reverse';
                }

                showWidget = !showWidget;
            }
        }
    }
}

function onMouseMoveListener() {
    window.addEventListener('mousemove', e => {
        if (cursorOption === 2) {
            const readingLine = document.getElementById('widget-window-cursor');
            console.log(e);
            if (e.pageY > 30) {
                readingLine.style.marginTop = `${parseInt(e.pageY) - 80}px`;
            } else {
                readingLine.style.marginTop = parseInt(e.pageY) - 15;
            }
        }
    });
}

function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode == 85) {
        // call your function to do the thing
        toggleWidget();
    }
}

function toggleWidget() {
    if (showWidget) {
        let x = document.getElementById("main-widget-container");
        x.style.display = "none";

        let y = document.getElementById("main-widget-container-move");
        y.style.display = "none";

        if (selectedPosition === 1 || selectedPosition === 3) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row';
        }
        if (selectedPosition === 2 || selectedPosition === 4) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row-reverse';
        }

        showWidget = !showWidget;
    } else {
        mouseOutWid();
        let x = document.getElementById("main-widget-container");
        x.style.display = "block";
        showWidget = !showWidget;

        if (selectedPosition === 1 || selectedPosition === 3) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row-reverse';
        }

        if (selectedPosition === 2 || selectedPosition === 4) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row';
        }
    }
}

function mouseOverWid() {
    if (!showWidget) {
        widgetHideUnhide.style.display = 'block';
    }

}

function mouseOutWid() {
    // const w = document.getElementById('hide');
    // w.style.display = "none";
    setTimeout(
        function () {
            widgetHideUnhide.style.display = 'none';
        },
        1000);

}

function mouseover(id) {
    const x = document.getElementById(id);
    x.style.backgroundColor = "#f1f4f7";



}

function mouseout(id) {
    const x = document.getElementById(id);
    x.style.backgroundColor = "inherit";
}


function onHideClick() {
    if (!hideUnhide) {
        const x = document.getElementById("widget-main-icon-div");
        x.style.position = "absolute";
        if (selectedPosition === 1 || selectedPosition === 3) {
            x.style.marginLeft = "-60px";
        } else {
            x.style.marginLeft = "50px";
        }

        const currentlElemText = document.getElementById('option-hide');
        currentlElemText.innerHTML = 'Unhide';

        let y = document.getElementById("main-widget-container");
        y.style.display = "none";

        // const currentlElemHide = document.getElementById('hide');
        // currentlElemHide.style.right = '40px';

        hideUnhide = !hideUnhide
    } else {
        const x = document.getElementById("widget-main-icon-div");
        x.style.position = "relative";
        x.style.marginLeft = "0";

        const currentlElemText = document.getElementById('option-hide');
        currentlElemText.innerHTML = 'Hide';

        // const currentlElemHide = document.getElementById('hide');
        // currentlElemHide.style.right = '22px';

        hideUnhide = !hideUnhide
    }
}


function isPluginActive() {
    const currentWidImage = document.getElementById('widget-main-icon-div-icon');
    if (widgetEnabled !== 0) {
        currentWidImage.src = 'walkingman.png';
    } else {
        currentWidImage.src = 'walkingman.png';
    }
    // if (keyboardNavigation) console.log('came 1');
    // if (readPage) console.log('came 2');
    // if (contrast) console.log('came 3');
    // if (highlighLinks) console.log('came 4');
    // if (fontSize) console.log('came 5');
    // if (letterSpacing) console.log('came 6');
    // if (cursorOption) console.log('came 7');
    // if (legibleFonts) console.log('came 8');
    // if (
    //     keyboardNavigation || readPage || contrast || highlighLinks
    //     || fontSize || letterSpacing || cursorOption || legibleFonts) {
    //     const activeIcon = document.getElementById('widget-option-main-icon');
    //     activeIcon.style.display = 'flex';
    // } else {
    //     const activeIcon = document.getElementById('widget-option-main-icon');
    //     activeIcon.style.display = 'none';
    // }
}

function onClickOption1(type = true) {
    console.log(widgetEnabled);
    if (visualpreset) {
        widgetEnabled = widgetEnabled - 1;
        const currentElem = document.getElementById('option-visualprofile')
        currentElem.style.border = 'none';
        visualpreset = false;
        const newelemone = document.getElementById('para-visual')
        newelemone.style.display = 'none';
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'inherit';
       const checkedswitch = document.getElementById('uncheckedswitch')
       checkedswitch.style.display='inherit';
       const checkedswitchone = document.getElementById('checkedswitch')
       checkedswitchone.style.display='none';
       const styleone = document.getElementById('highsat')
       styleone.style.display='none';
        
        
    } else {
        widgetEnabled = widgetEnabled + 1;
        const currentElem = document.getElementById('option-visualprofile')
        currentElem.style.border = '2px solid #00FFFF';
        visualpreset = true;
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'none';
        const newelemone = document.getElementById('para-visual')
        newelemone.style.display = 'inherit';
        const styleone = document.getElementById('highsat')
       styleone.style.display='inherit';
       const checkedswitch = document.getElementById('uncheckedswitch')
       checkedswitch.style.display='none';
       const checkedswitchone = document.getElementById('checkedswitch')
       checkedswitchone.style.display='inherit';
       
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function onClickOption2(type = true) {
    console.log(widgetEnabled);
    if (hearingpreset) {
        widgetEnabled = widgetEnabled - 1;
        const currentElem = document.getElementById('option-hearingslider')
        currentElem.style.border = 'none';
        hearingpreset = false;
        const newelemone = document.getElementById('para-hearing')
        newelemone.style.display = 'none';
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'inherit';
        
        
    } else {
        widgetEnabled = widgetEnabled + 1;
        const currentElem = document.getElementById('option-hearingslider')
        currentElem.style.border = '2px solid #00FFFF';
        hearingpreset = true;
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'none';
        const newelemone = document.getElementById('para-hearing')
        newelemone.style.display = 'inherit';
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function onClickOption3(type = true) {
    console.log(widgetEnabled);
    if (physicalpreset) {
        widgetEnabled = widgetEnabled - 1;
        const currentElem = document.getElementById('option-physicalprofile')
        currentElem.style.border = 'none';
        physicalpreset = false;
        const newelemone = document.getElementById('para-physical')
        newelemone.style.display = 'none';
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'inherit';
        
        
        
    } else {
        widgetEnabled = widgetEnabled + 1;
        const currentElem = document.getElementById('option-physicalprofile')
        currentElem.style.border = '2px solid #00FFFF';
        physicalpreset = true;
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'none';
        const newelemone = document.getElementById('para-physical')
        newelemone.style.display = 'inherit';
        
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function onClickOption4(type = true) {
    console.log(widgetEnabled);
    if (cognitivepreset) {
        widgetEnabled = widgetEnabled - 1;
        const currentElem = document.getElementById('option-cognitiveslider')
        currentElem.style.border = 'none';
        cognitivepreset = false;
        const newelemone = document.getElementById('para-cognitive')
        newelemone.style.display = 'none';
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'inherit';
        const contenttwo = document.getElementById('contentbuttontwo')
        contenttwo.style.backgroundColor = '#FFFFFF';
        const contentthree = document.getElementById('contentbuttonthree')
        contentthree.style.backgroundColor = '#FFFFFF';
        const navigatethree = document.getElementById('navigationbuttonthree')
        navigatethree.style.backgroundColor = '#FFFFFF';
        
        
    } else {
        widgetEnabled = widgetEnabled + 1;
        const currentElem = document.getElementById('option-cognitiveslider')
        currentElem.style.border = '2px solid #00FFFF';
        cognitivepreset = true;
        const newelem = document.getElementById('para-profileselection')
        newelem.style.display = 'none';
        const newelemone = document.getElementById('para-cognitive')
        newelemone.style.display = 'inherit';
        const contenttwo = document.getElementById('contentbuttontwo')
        contenttwo.style.backgroundColor = '#00FFFF';
        const contentthree = document.getElementById('contentbuttonthree')
       contentthree.style.backgroundColor = '#00FFFF';
        const navigatethree = document.getElementById('navigationbuttonthree')
        navigatethree.style.backgroundColor = '#00FFFF';
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}


function onClickReadablefont(type =true)
{
    if (legibleFonts === 0) {
        widgetEnabled = widgetEnabled + 1;
        // const currentWidImage = document.getElementById('widget-main-icon-div-icon');
        // currentWidImage.src = 'https://citywebassist.blob.core.windows.net/frontendicons/front_end_icon_assests/assistIcon2.png';
        legibleFonts = legibleFonts + 1;
        let elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.fontFamily ="Tahoma";
        }
    }
        else {
            widgetEnabled = widgetEnabled - 1;
            legibleFonts = 0;
            let elems = document.querySelectorAll("*");
            let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.fontFamily = "initial";
            }
        }
}


function onClickHighlightLinks(type =true)
{
    if (highlighLinks) {
        widgetEnabled = widgetEnabled - 1;
        const elems = document.links;
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.backgroundColor = defaultLinksStyles[index].backgroundColor;
            elems[index].style.color = defaultLinksStyles[index].color;
            elems[index].style.textDecoration = defaultLinksStyles[index].decoration;
        }

        defaultLinksStyles = [];
        highlighLinks = !highlighLinks;
    } else {
        widgetEnabled = widgetEnabled + 1;
        const elems = document.links;
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            defaultLinksStyles.push({
                backgroundColor: elems[index].style.backgroundColor,
                color: elems[index].style.color,
                decoration: elems[index].style.textDecoration
            });
            elems[index].style.backgroundColor = "black";
            elems[index].style.color = "#ff0";
            elems[index].style.textDecoration = "underline";
        }
        highlighLinks = !highlighLinks;
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }

}

function onClickOption5(type = true) {
    console.log(widgetEnabled);
    if (textal) {
        widgetEnabled = widgetEnabled - 1;
        textal = false;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
           elems[index].style.textAlign ='left'; 
        }
    } 
    else {
        widgetEnabled = widgetEnabled + 1;
        textal = true;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.textAlign ="inherit";
         }
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function onClickOption6(type = true) {
    console.log(widgetEnabled);
    if (highlighttitles) {
        widgetEnabled = widgetEnabled - 1;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.backgroundColor = defaulthighlight[index].backgroundColor;
            elems[index].style.color = defaulthighlight[index].color;
            elems[index].style.border = defaulthighlight[index].border;
          elems[index].style.borderColor = defaulthighlight[index].borderColor;
          elems[index].style.width = defaulthighlight[index].width;
          elems[index].style.boxSizing = defaulthighlight[index].boxSizing; 
            
        }

        defaulthighlight = [];
        highlighttitles = !highlighttitles;
        

    } 
    else {
        widgetEnabled = widgetEnabled + 1;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            defaulthighlight.push({
                backgroundColor: elems[index].style.backgroundColor,
                color: elems[index].style.color,
               border : elems[index].style.border,
               borderColor: elems[index].style.borderColor,
               width:elems[index].style.width,
               boxSizing:elems[index].style.boxSizing 
                        
            });
            elems[index].style.backgroundColor = "white";
            elems[index].style.color = "black";
            elems[index].style.border = "solid";
            elems[index].style.borderColor = '#4A2972';
            elems[index].style.width = '150px';
            elems[index].style.boxSizing = 'border-box';
        }
        highlighttitles = !highlighttitles;
        
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function rightAlignfunction(type = true) {
    console.log(widgetEnabled);
    if (righttextal) {
        widgetEnabled = widgetEnabled - 1;
        righttextal = false;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
           elems[index].style.textAlign ='right';
        }
    } 
    else {
        widgetEnabled = widgetEnabled + 1;
        righttextal = true;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.textAlign ="inherit";
         }
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function CenterAlignfunction(type = true) {
    console.log(widgetEnabled);
    if (centertextal) {
        widgetEnabled = widgetEnabled - 1;
        centertextal = false;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
           elems[index].style.textAlign ='center'; 
        }
    } 
    else {
        widgetEnabled = widgetEnabled + 1;
        centertextal = true;
        let elems = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.textAlign ="inherit";
         }
    }
    isPluginActive();
    if (type) {
        savePreferences();
    }
}

function increasewordspacing()
{
  mycounterval = parseInt(mycounterval) +1; 
  console.log(mycounterval);
  document.getElementById('option-wordspan').innerHTML="%"+mycounterval;
    let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
    let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.wordSpacing =`${mycounterval}px`;
         }
}

function decreasewordspacing()
{
  mycounterval = parseInt(mycounterval) -1; 
  console.log(mycounterval);
  document.getElementById('option-wordspan').innerHTML="%"+mycounterval;
    let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
    let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.wordSpacing =`${mycounterval}px`;
         }
}

function increaseletterspacing()
{
  mycountervalone = parseInt(mycountervalone) +1; 
  console.log(mycountervalone);
  document.getElementById('option-letterspan').innerHTML="%"+mycountervalone;
    let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
    let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.letterSpacing =`${mycountervalone}px`;
         }
}

function decreaseletterpacing()
{
  mycountervalone = parseInt(mycountervalone) -1; 
  console.log(mycountervalone);
  document.getElementById('option-letterspan').innerHTML="%"+mycountervalone;
    let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
    let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.letterSpacing =`${mycountervalone}px`;
         }
}

function increaselineheight()
{
    mycountervaltwo = parseInt(mycountervaltwo) +1; 
    console.log(mycountervaltwo);
    document.getElementById('option-heightspan').innerHTML= mycountervaltwo;
      let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.lineHeight =`${mycountervaltwo}px`;
           }
  }

  function decreaselineheight()
{
    mycountervaltwo = parseInt(mycountervaltwo) -1; 
    console.log(mycountervaltwo);
    document.getElementById('option-heightspan').innerHTML= mycountervaltwo;
      let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.lineHeight =`${mycountervaltwo}px`;
           }
  }

  function geryscaleContrast(contrast) {
    if (contrast === 3) {
        let css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: grayscale(100%);' +
            '-o-filter: grayscale(100%);' +
            '-ms-filter: grayscale(100%); ' +
            '-webkit-filter: grayscale(100%); ' +
            'filter: grayscale(100%); '
            ,

            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');


        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    } else {
        let css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: none;' +
            '-o-filter: none;' +
            '-ms-filter: none; ' +
            '-webkit-filter: none; ' +
            'filter: none; '
            ,

            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');


        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }
}
 
function invertColors() {
    // the css we are going to inject
    let css = 'html {-webkit-filter: invert(100%);' +
        '-moz-filter: invert(100%);' +
        '-o-filter: invert(100%);' +
        '-ms-filter: invert(100%); ' +
        'filter: invert(100%); ' +
        'filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'invert\'><feColorMatrix in=\'SourceGraphic\' type=\'matrix\' values=\'-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0\'/></filter></svg>#invert"); }'
        ,

        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    // a hack, so you can "invert back" clicking the bookmarklet again
    if (!window.counter) { window.counter = 1; } else {
        window.counter++;
        if (window.counter % 2 == 0) { css = 'html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }' }
    };

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function onclickinvertcolors()
{
    if (contrast === 0) {
        widgetEnabled = widgetEnabled + 1;
        invertColors();
    }
        
     else {
            widgetEnabled = widgetEnabled - 1;
            geryscaleContrast(contrast);
            contrast = 0;
        }

isPluginActive();
    if (type) {
        savePreferences();
    }

}



function darkContrast(flag) {
    if (flag) {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars') || id.includes('-image') ||
                    id.includes('option-') || id.includes('-option'))) || id === 'main-widget-container' ||
                    id.includes('para-') || id.includes('-image') || id.includes('widget-')) {
                    return false;
                }
            }
            return item;
        });
        defaultElementsStyles = [];
        getAllElements.forEach(item => {
            defaultElementsStyles.push({
                item,
                color: item.style.color,
                backgroundColor: item.style.backgroundColor
            });
            if (window.getComputedStyle(item).color === 'rgb(0, 0, 0)') item.style.color = 'white';
            item.style.backgroundColor = 'black';
        })
    } else {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars') || id.includes('-image') ||
                    id.includes('option-') || id.includes('-option'))) || id === 'main-widget-container' ||
                    id.includes('para-') || id.includes('-image') || id.includes('widget-')) {
                    return false;
                }
            }
            return item;
        });
        getAllElements.forEach((item, index) => {
            item.style.color = defaultElementsStyles[index].color;
            item.style.backgroundColor = defaultElementsStyles[index].backgroundColor;
        })
        defaultElementsStyles = [];
    }
}


function lighContrast(flag) {
    if (flag) {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars'))) || id === 'main-widget-container' || id.includes('-image') ||
                id.includes('option-') ||
                id.includes('para-')|| id.includes('widget-')) {
                    return false;
                    
                }
            }
            return item;
        });
        getAllElements.forEach(item => {
            defaultElementsStyles.push({
                item,
                color: item.style.color,
                backgroundColor: item.style.backgroundColor
            });
            if (window.getComputedStyle(item).color === 'rgb(255, 255, 255)') item.style.color = 'black';
            item.style.backgroundColor = 'unset';
        })
        } else {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars'))) || id === 'main-widget-container' || id.includes('-image') ||
                id.includes('option-') ||
                id.includes('para-')|| id.includes('widget-')) {
                    return false;
                }
            }
            return item;
        });
        getAllElements.forEach((item, index) => {
            item.style.color = defaultElementsStyles[index].color;
            item.style.backgroundColor = defaultElementsStyles[index].backgroundColor;
        })
        defaultElementsStyles = [];
    }
}


function HighContrast(flag) {
    if (flag) {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars') || id.includes('-image') ||
                    id.includes('option-') || id.includes('-option'))) || id === 'main-widget-container' ||
                    id.includes('para-') || id.includes('-image') || id.includes('widget-')) {
                    return false;
                }
            }
            return item;
        });
        defaultElementsStyles = [];
        getAllElements.forEach(item => {
            defaultElementsStyles.push({
                item,
                color: item.style.color,
                backgroundColor: item.style.backgroundColor
            });
            if (window.getComputedStyle(item).color === 'rgb(0, 0, 0)') item.style.color = '#F6FDB6';
            item.style.backgroundColor = 'black';
        })
    } else {
        const getAllElements = Array.from(document.querySelectorAll('*')).filter(item => {
            if (item.id) {
                const id = item.id.toString();
                if ((id.includes('option-') && (id.includes('-icon') || id.includes('-bars') || id.includes('-image') ||
                    id.includes('option-') || id.includes('-option'))) || id === 'main-widget-container' ||
                    id.includes('para-') || id.includes('-image') || id.includes('widget-')) {
                    return false;
                }
            }
            return item;
        });
        getAllElements.forEach((item, index) => {
            item.style.color = defaultElementsStyles[index].color;
            item.style.backgroundColor = defaultElementsStyles[index].backgroundColor;
        })
        defaultElementsStyles = [];
    }
}

function onclickdarkcontrast()
{

   if (mydarkcontrast === 0) {
        widgetEnabled = widgetEnabled + 1;
        darkContrast(true);
        mydarkcontrast = 1;
        console.log(mydarkcontrast);
    }
    else
    {
        widgetEnabled = widgetEnabled - 1;
        darkContrast(false);
        mydarkcontrast = 0;

    }

}

function onclicklightcontrast()
{

   if (mylightcontrast === 0) {
        widgetEnabled = widgetEnabled + 1;
        lighContrast(true);
        mylightcontrast = 1;
        console.log(mylightcontrast);
    }
    else
    {
        widgetEnabled = widgetEnabled - 1;
        lighContrast(false);
        mylightcontrast = 0;

    }


}

function onclickmonochrome()
{

   if (mymonochrome === 0) {
        contrast = 3;
        console.log(contrast);
        geryscaleContrast(contrast);
        mymonochrome = 1;
    }
    else
    {
        widgetEnabled = widgetEnabled - 1;
        contrast = 0;
        geryscaleContrast(contrast);
        mymonochrome = 0;
    }


}
  

function ONCLICKhighcontrast()
{

   if (myhighcontrast === 0) {
        widgetEnabled = widgetEnabled + 1;
        HighContrast(true);
        myhighcontrast = 1;
        console.log(mydarkcontrast);
    }
    else
    {
        widgetEnabled = widgetEnabled - 1;
        HighContrast(false);
        myhighcontrast = 0;

    }

}

function onclickRedColor(){
    if(myredcolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = 'red';
           }
           myredcolor =1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             myredcolor = 0;
    }
}

function onclickYellowColor(){
    if(myyellowcolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = 'yellow';
           }
           myyellowcolor =1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             myyellowcolor = 0;
    }
}

function onclickBlueColor(){
    if(mybluecolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = '#3624FF';
           }
           mybluecolor =1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             mybluecolor = 0;
    }
}

function onclickGreenColor(){
    if(mygreencolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = '#0DFF34';
           }
           mygreencolor = 1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             mygreencolor = 0;
    }
}

function onclickPinkColor(){
    if(mypinkcolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = '#FF24F6';
           }
           mypinkcolor = 1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             mypinkcolor = 0;
    }
}


function onclickOrangeColor(){
    if(myorangecolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = '#FFB800';
           }
           myorangecolor = 1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             myorangecolor = 0;
    }
}

function onclickBlackColor(){
    if(myblackcolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = 'black';
           }
           myblackcolor = 1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             myblackcolor = 0;
    }
}

function onclickPurpleColor(){
    if(mypurplecolor===0)
    {
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
      let index = 0, length = elems.length;
          for (; index < length; index++) {
              elems[index].style.color = '#4A2972';
           }
          mypurplecolor = 1;
    }

    else{
        let elems = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')
        let index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.color = 'black';
             }
             mypurplecolor = 0;
    }
}

function onclickReadingGuide()
{
    if (readPage === 0) {
    widgetEnabled = widgetEnabled + 1;
    window.speechSynthesis.cancel();
    utter.rate = 1;
        utter.pitch = 0.5;
        utter.text = 'Reading page normally';
        utter.voice = english_voice;

        readPage = 1;
        window.speechSynthesis.speak(utter);
    }
    else{
        widgetEnabled = widgetEnabled - 1;
        readPage = 0;
        window.speechSynthesis.cancel();
        utter.rate = 1;
        utter.pitch = 0.5;
        utter.text = 'Reading page disabled';
        utter.voice = english_voice;
        window.speechSynthesis.speak(utter);
    }

    isPluginActive();
    if (type) {
        savePreferences();
    }
    
}

function onclickKeyboardNavigation()
{

    if (keyboardNavigation) {
        widgetEnabled = widgetEnabled - 1;
        const elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].addEventListener('focusin', (event) => {
                event.target.style.outline = '-webkit-focus-ring-color auto 5px';
            });

            keyboardNavigation = false;

        }
    }

    else 
    {
        widgetEnabled = widgetEnabled + 1;
        const elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].addEventListener('focusin', (event) => {
                event.target.style.outline = '3px dashed #c00';
            });
            elems[index].addEventListener('focusout', (event) => {
                event.target.style.outline = 'none';
            });
        }

        keyboardNavigation = true;

    }

    isPluginActive();
    if (type) {
        savePreferences();
    }
    

}

function onclickMuteSound()
{
    if(mymutesounds === 0)
    {
    var vid = document.getElementById("sound-audio");
    vid.muted = true;
    mymutesounds =1;
}

else{
    var vid = document.getElementById("sound-audio");
    vid.muted = false;
    mymutesounds =0;
}

}

function onclickstopanimation()
{
    if(mystopanimation === 0)
    {
     ball.style.animation = 'none';   
     mystopanimation =1;
    }
    else
    {
        ball.style.animation = '';
        mystopanimation = 0;   
    }
}

function onclickHighlightFocuselement()
{

    if (highlightfocus) {
        widgetEnabled = widgetEnabled - 1;
        const elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].addEventListener('focusin', (event) => {
                event.target.style.outline = '-webkit-focus-ring-color auto 5px';
               
            });

            highlightfocus = false;

        }
    }

    else 
    {
        widgetEnabled = widgetEnabled + 1;
        const elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].addEventListener('focusin', (event) => {
                event.target.style.outline = '3px dashed #c00';
                event.target.style.backgroundColor = 'yellow';
            });
            elems[index].addEventListener('focusout', (event) => {
                event.target.style.outline = 'none';
                event.target.style.backgroundColor = 'none';
            });
        }

        highlightfocus = true;

    }
}



function applyMoveWidget(value) {
    const getWindow = document.getElementById('widget-window');
    const mainContainer = document.getElementById('widget-main-div-both-container');
    const hideUnhideWidget = document.getElementById('hide');


    if (value === 'widget-option-top-left') {
        getWindow.style.justifyContent = 'flex-start';
        // getWindow.style.width = '452px !important';
        getWindow.style.right = 'auto';
        getWindow.style.bottom = 'auto';

        mainContainer.style.flexDirection = 'row-reverse';
        mainContainer.style.alignItems = 'flex-start';

        hideUnhideWidget.style.marginLeft = '80px';

        selectedPosition = 1;
    } else if (value === 'widget-option-top-right') {
        if (selectedPosition !== 0) {
            // getWindow.style.justifyContent = 'flex-end';
            // getWindow.style.width = '100%';
            getWindow.style.right = 2;
            getWindow.style.bottom = 'auto';

            mainContainer.style.flexDirection = 'row';
            mainContainer.style.alignItems = 'flex-start';

            hideUnhideWidget.style.marginLeft = '-20px';

            selectedPosition = 2;
        }
    } else if (value === 'widget-option-bottom-left') {
        getWindow.style.right = 'auto';
        getWindow.style.bottom = 2;

        mainContainer.style.flexDirection = 'row-reverse';
        mainContainer.style.alignItems = 'flex-end';

        hideUnhideWidget.style.marginLeft = '80px';

        selectedPosition = 3;
    } else if (value === 'widget-option-bottom-right') {
        getWindow.style.bottom = '2px';
        getWindow.style.right = '2px';

        mainContainer.style.alignItems = 'flex-end';
        mainContainer.style.flexDirection = 'row';

        selectedPosition = 4;
    }

}

function onChangeMoveOption(event) {
    const value = event.target.value;
    if (value === 'widget-option-top-left') {
        // const radio1 = document.get
    }
}

function scrollToElement(elem) {
    openModal();
    elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function onClickLink(elem) {
    openModal();
    // elem.click();
    if (elem.href) {
        window.open(
            elem.href, "_blank");
    }
    // elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function fetchAllHeadings() {
    if (!fetchAllHeadingsFlag) {
        const contentDiv = document.getElementById('widget-modal-header-tabs-1-content');
        const allElems = Array.from(document.querySelectorAll('*'));
        const allHeadings = allElems.filter(item => {
            const tag = item.tagName.toString().toLowerCase();
            if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
                return true;
            }
            return false;
        })

        const leftSpacing = {
            'H1': 0,
            'H2': '10px',
            'H3': '20px',
            'H4': '30px',
            'H5': '40px',
            'H6': '50px',
        };

        allHeadings.map((eachItem, index) => {
            const eachDiv = document.createElement("div");
            eachDiv.id = 'widget-modal-header-tabs-content-each-heading';
            eachDiv.style.display = 'flex';
            eachDiv.style.marginLeft = leftSpacing[eachItem.tagName];
            eachDiv.style.cursor = 'pointer';
            if (index > 0) {
                eachDiv.style.marginTop = '10px';
            }

            eachDiv.onclick = function () {
                scrollToElement(eachItem);
            };

            const eachDivIconDiv = document.createElement("div");
            eachDivIconDiv.id = 'widget-modal-header-tabs-content-each-heading-icon-div';
            eachDivIconDiv.style.display = 'flex';
            eachDivIconDiv.style.fontSize = '12px !important';
            eachDivIconDiv.style.fontWeight = '400';
            eachDivIconDiv.style.textTransform = 'uppercase';
            eachDivIconDiv.style.background = '#1e242a';
            eachDivIconDiv.style.opacity = '0.8';
            eachDivIconDiv.style.borderRadius = '5px';
            eachDivIconDiv.style.alignItems = 'center';
            eachDivIconDiv.style.justifyContent = 'center';
            eachDivIconDiv.style.alignSelf = 'center';
            eachDivIconDiv.style.height = '27px';
            eachDivIconDiv.style.width = '30px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconText = document.createElement("p");
            eachDivIconText.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDivIconText.style.color = '#ffffff';
            eachDivIconText.style.margin = '0 8px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconTextData = document.createTextNode(eachItem.tagName);
            eachDivIconTextData.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDiv.style.cursor = 'pointer';

            eachDivIconText.appendChild(eachDivIconTextData);   //appended text to the heading icon
            eachDivIconDiv.appendChild(eachDivIconText);        //appended icon with text inside in first div

            const eachDivTextDiv = document.createElement("div");
            eachDivTextDiv.id = 'widget-modal-header-tabs-content-each-heading-text-div';
            eachDivTextDiv.style.display = 'flex';
            eachDivTextDiv.style.fontSize = '13px!important';
            eachDivTextDiv.style.alignItems = 'center';
            eachDivTextDiv.style.height = 'auto';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextText = document.createElement("p");
            eachDivTextText.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDivTextText.style.color = '#006dd5';
            eachDivTextText.style.margin = '0';
            eachDivTextText.style.marginLeft = '10px';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextTextData = document.createTextNode(eachItem.innerText);
            eachDivTextTextData.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDiv.style.cursor = 'pointer';

            eachDivTextText.appendChild(eachDivTextTextData);   //appended text to the heading icon
            eachDivTextDiv.appendChild(eachDivTextText);        //appended icon with text inside in second div

            eachDiv.appendChild(eachDivIconDiv);                //appended first div to each row div
            eachDiv.appendChild(eachDivTextDiv);                //appended first div to each row div

            contentDiv.appendChild(eachDiv);
        })
        fetchAllHeadingsFlag = true;
    }
}

function fetchAllLinks() {
    if (!fetchAllLinksFlag) {
        const contentDiv = document.getElementById('widget-modal-header-tabs-2-content');
        const allElems = Array.from(document.querySelectorAll('a'));

        allElems.map((eachItem, index) => {
            const eachDiv = document.createElement("div");
            eachDiv.id = 'widget-modal-header-tabs-content-each-heading';
            eachDiv.style.display = 'flex';
            eachDiv.style.cursor = 'pointer';
            if (index > 0) {
                eachDiv.style.marginTop = '10px';
            }

            eachDiv.onclick = function () {
                onClickLink(eachItem);
            };

            const eachDivIconDiv = document.createElement("div");
            eachDivIconDiv.id = 'widget-modal-header-tabs-content-each-heading-icon-div';
            eachDivIconDiv.style.display = 'flex';
            eachDivIconDiv.style.fontSize = '12px !important';
            eachDivIconDiv.style.fontWeight = '400';
            eachDivIconDiv.style.textTransform = 'uppercase';
            eachDivIconDiv.style.background = '#1e242a';
            eachDivIconDiv.style.opacity = '0.8';
            eachDivIconDiv.style.borderRadius = '5px';
            eachDivIconDiv.style.alignItems = 'center';
            eachDivIconDiv.style.justifyContent = 'center';
            eachDivIconDiv.style.alignSelf = 'center';
            eachDivIconDiv.style.height = '27px';
            eachDivIconDiv.style.width = '30px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconText = document.createElement("p");
            eachDivIconText.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDivIconText.style.color = '#ffffff';
            eachDivIconText.style.margin = '0 8px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconTextData = document.createTextNode(eachItem.tagName);
            eachDivIconTextData.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDiv.style.cursor = 'pointer';

            eachDivIconText.appendChild(eachDivIconTextData);   //appended text to the heading icon
            eachDivIconDiv.appendChild(eachDivIconText);        //appended icon with text inside in first div

            const eachDivTextDiv = document.createElement("div");
            eachDivTextDiv.id = 'widget-modal-header-tabs-content-each-heading-text-div';
            eachDivTextDiv.style.display = 'flex';
            eachDivTextDiv.style.fontSize = '13px!important';
            eachDivTextDiv.style.alignItems = 'center';
            eachDivTextDiv.style.height = 'auto';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextText = document.createElement("p");
            eachDivTextText.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDivTextText.style.color = '#006dd5';
            eachDivTextText.style.margin = '0';
            eachDivTextText.style.marginLeft = '10px';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextTextData = document.createTextNode(eachItem.innerText || eachItem.ariaLabel || '');
            eachDivTextTextData.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDiv.style.cursor = 'pointer';

            eachDivTextText.appendChild(eachDivTextTextData);   //appended text to the heading icon
            eachDivTextDiv.appendChild(eachDivTextText);        //appended icon with text inside in second div

            eachDiv.appendChild(eachDivIconDiv);                //appended first div to each row div
            eachDiv.appendChild(eachDivTextDiv);                //appended first div to each row div

            contentDiv.appendChild(eachDiv);
        })
        fetchAllLinksFlag = true;
    }
}