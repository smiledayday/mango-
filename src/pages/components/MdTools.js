import { useRef } from 'react'
import { Tooltip } from 'antd'
import styled from '@emotion/styled'
import { MD_TOOLS } from '../model/mdTool'

const LittleTool = styled.div`
  font-size: 18px;
  &:not(:first-of-type) {
    margin-left: 10px;
  }
  cursor: pointer;
`
const Wrapper = styled.div`
  width: 250px;
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const MdTools = ({ style, currentRef, textAreaRef, inputList, nextLine }) => {
  const countRef = useRef(0)
  const changeStyle = desc => {
    switch (desc) {
      case '一级标题': {
        currentRef.current.style.fontSize = 35 + 'px'
        break
      }
      case '二级标题': {
        currentRef.current.style.fontSize = 28 + 'px'
        break
      }
      case '三级标题': {
        currentRef.current.style.fontSize = 22 + 'px'
        break
      }
      case '有序列表': {
        countRef.current++
        currentRef.current.value =
          countRef.current + '.  ' + currentRef.current.value
        break
      }
      case '无序列表': {
        console.log(nextLine.value)
        nextLine.value = '.'
        currentRef.current = document.createElement('ul')
        currentRef.current.style.listStyle = 'circle'
        break
      }
      case '右对齐': {
        textAreaRef.current.style.marginRight = 0
        break
      }
      case '左对齐': {
        textAreaRef.current.style.marginLeft = 0
        break
      }
      case '居中对齐': {
        textAreaRef.current.style.margin = '0 auto'

        break
      }
      default: {
        style = {
          fontSize: '12px'
        }
      }
    }
    return
  }
  return (
    <Wrapper>
      {MD_TOOLS.map(({ data, desc }, index) => (
        <LittleTool key={index} onClick={() => changeStyle(desc)}>
          <Tooltip placement='bottom' title={desc} trigger='hover'>
            {data}
          </Tooltip>
        </LittleTool>
      ))}
    </Wrapper>
  )
}

export default MdTools
