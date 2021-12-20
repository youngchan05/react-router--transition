import React from 'react'
import Header from '../../components/Header/Header'
import Lnb from '../../components/Lnb'
import Title from '../../components/Title/Title'
const Board = () => {
    return (
        <div>
            <Header/>
            <Lnb id={1}/>
            <Title text={'공지사항'}/>
        </div>
    )
}

export default Board
