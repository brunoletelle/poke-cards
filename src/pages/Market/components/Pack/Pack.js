import './styles/Pack.scss'
import React from "react"
export default function Pack(props){

    const type = props.type

    const backgroundType = type === "bronze" ? 'radial-gradient(ellipse farthest-corner at right bottom, #ffdeca 0%, #ca7345 8%, #ca7345 30%, #a14521 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%,  #ffdeca 8%, #ca7345 25%, #a14521 62.5%, #a14521 100%)' 
                        : type === "silver" ? 'radial-gradient(ellipse farthest-corner at right bottom, #dedede 0%, #dedede 8%, #a1a1a1 30%, #a1a1a1 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #dedede 8%, #dedede 25%, #dedede 62.5%, #a1a1a1 100%)'
                        : type === "gold" ? 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)'
                        : 'radial-gradient(ellipse farthest-corner at right bottom, #FFFF 0%, #caa1de 8%, #dedede 30%, #FFFFFF 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #dedede 8%, #caa1de 25%, #FFFFFF 62.5%, #dea1ca 100%)'

    const borderType = type === "bronze" ? '#a14521'
                    : type === "silver" ? '#a1a1a1'
                    : type === "gold" ? '#5d4a1f'
                    : '#dea1ca'

    return(
        <div className="espacio3D">
            <div className="cubo3D">
                <aside className="cara cara1" style={{background: backgroundType, borderColor: borderType}}>
                    <img style={{width: "260px", margin: "20px 0"}} src={`/icons/poke-logo-${type}.png`} alt="Card Icon"/> 
                    <img style={{width: "130px"}} src={`/icons/pokeball-${type}.png`} alt="Card Icon"/>
                </aside>
                <aside className="cara cara11" style={{background: backgroundType, borderColor: borderType}}></aside>
                <aside className="cara cara12" style={{background: backgroundType, borderColor: borderType}}></aside>
                <aside className="cara cara13" style={{background: backgroundType, borderColor: borderType}}></aside>
                <aside className="cara cara14" style={{background: backgroundType, borderColor: borderType}}></aside>
                <aside className="cara cara15" style={{background: backgroundType, borderColor: borderType}}></aside>
                <aside className="cara cara16" style={{background: backgroundType, borderColor: borderType}}></aside>
            </div>
        </div>
    )
}

/* 

                <aside className="caraSide cara3"></aside>
                <aside className="caraSide cara4"></aside>
                <aside className="caraTopBot cara5"></aside>
                <aside className="caraTopBot cara6"></aside>

    DORADO:
      background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
    


    SILVER:
    background: 'radial-gradient(ellipse farthest-corner at right bottom, #dedede 0%, #dedede 8%, #a1a1a1 30%, #a1a1a1 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #dedede 8%, #dedede 25%, #dedede 62.5%, #a1a1a1 100%)';

    BRONCE:
    background: 'radial-gradient(ellipse farthest-corner at right bottom, #ffdeca 0%, #ca7345 8%, #ca7345 30%, #a14521 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%,  #ffdeca 8%, #ca7345 25%, #a14521 62.5%, #a14521 100%)';


    PERLA:
    background: radial-gradient(ellipse farthest-corner at right bottom, #FFFF 0%, #caa1de 8%, #dedede 30%, #FFFFFF 40%, transparent 80%),
    radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #dedede 8%, #caa1de 25%, #FFFFFF 62.5%, #dea1ca 100%);
    
*/