import {
  LeftOutlined,
  StarOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import styled from '@emotion/styled'
import { Button, Divider, Input, Popover, Tooltip, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import markdownIt from 'markdown-it'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'
import qs from 'qs'
import UserInfo from '../components/UserInfo'
import MdTools from '../components/MdTools'
import { getParams } from '../../util/getParams'
import { objToArray } from '../../util/objToArr'

const { Option } = Select

const ICON_STYLE = {
  fontSize: '20px',
  margin: '0 20px'
}

const TopTool = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  border-bottom: 0.5px solid #444444;
`

const InnerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const DocsName = styled.div`
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: var(--text-title);
  font-size: 14px;
  line-height: 20px;
  padding: 0 5px;
`

const LatestTime = styled.span`
  color: #777;
  font-size: 10px;
`

const HoverIcon = styled.div`
  &:hover {
    background: #444444;
    opacity: 0.5;
    // height: auto;
    // width: auto;
    border-radius: 5px;
  }
`
const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 5px;
  width: 100%;
  height: auto;
`

const NavBar = styled.div`
  width: 20%;
  height: auto;
`

const DocsArea = styled.input`
  width: 100%;
  height: auto;
  min-height: 30px;
  border: none;
  line-height: 20px;
  &:hover {
    background: #cfe7fc;
    border-radius: 5px;
  }
  &:focus {
    outline: none;
    background: #fff;
  }
  color: black;
  // font-size: 24px;
  &:not(first-of-type) {
    margin-top: 20px;
  }
`

const Content = styled.div`
  width: 50%;
`

const id = getParams(window.location.search)

// 数据结构 数组对象形式 例如
// {
//   index: 第几个输入框
//   content: 该输入框下内容
//   style : 该输入框下内容样式
// }

// 或许 我只需要保存每一个input的值就可以 用数组存下来

const CreateDocs = () => {
  // 用来存储传给后端的文章内容的参数
  const [textContent, setTextContent] = useState([])
  // 存储共有多少个input 初始值有一个
  const [inputLine, setInputLine] = useState([])

  const [dataMap, setDataMap] = useState(null)
  // 文章的标题
  const [title, setTitle] = useState('')
  const [first, setFirst] = useState('')
  // 默认的input样式 暂时只有字体大小
  const currentStyle = { fontSize: '18px' }

  const testArr = []

  const currentInputRef = useRef(null)
  const nextLineRef = useRef(null)
  const TextAreaRef = useRef(null)
  const linkRef = useRef(null)
  const stylePopover = (
    <MdTools
      style={currentStyle}
      currentRef={currentInputRef}
      textAreaRef={TextAreaRef}
      inputList={inputLine}
      // nextLine={nextLine}
    ></MdTools>
  )
  const copyUrl = () => {
    linkRef.current.value = window.location.href
  }
  const handleChange = () => {}

  const content = (
    <div>
      <Input
        ref={linkRef}
        addonBefore={
          <Select
            defaultValue='获得链接的人可阅读'
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value='可阅读'>获得链接的人可阅读</Option>
            <Option value='可编辑'>获得链接的人可编辑</Option>
          </Select>
        }
        suffix={
          <CopyToClipboard text={window.location.href} onCopy={copyUrl}>
            <span>双击复制链接</span>
          </CopyToClipboard>
        }
        value={window.location.href}
      ></Input>
    </div>
  )

  const goBack = () => {
    console.log('back')
  }
  const handleFavorite = () => {
    console.log('favorite')
  }
  const changeTitle = e => {
    setTitle(e.target.value)
  }
  let params = {
    name: title,
    // 用户信息 以后再说
    author: '恭喜发财',
    latestAt: new Date(),
    content: null,
    id: id,
    firstLine: ''
  }

  const saveFirstLine = e => {
    setFirst(e.target.value)
  }
  // 由于我监听了 每一个input的change函数 所以没必要再重复监听onChange

  /**
   * 因为每次对文章进行编辑操作时 也就是某一个input输入框内容发生变化时 都要触发文章的保存
   * 保存策略是 每次都告诉后端title、author、name、content的全部内容
   * 所以在这里 必须知道 有多少个input被创建 并且要知道 每个input的内容
   * 存到一个数组中
   */

  const emitSave = event => {
    const inputArr = document.getElementsByTagName('input')
    // 删除第一个和第二个input 也就是 标题和第一行的内容单传
    const arr = objToArray(inputArr)
    params.firstLine = Object.values(arr[1])[0].value
    arr.splice(0, 2)
    arr.map(i => {
      const input = Object.values(i)[0]
      testArr.push(input.value)
      params.content = testArr.toString()
    })
    // 将数组类型 转成字符串传给后端
    // params.content = textContent.toString()
    axios.post('http://localhost:8080/docs/save', qs.stringify(params))
  }

  useEffect(() => {
    if (id) {
      axios
        .post('http://localhost:8080/docs/see', qs.stringify({ id: id }))
        .then(res => {
          if (res.status === 200) {
            const data = res.data.data[0]

            setTitle(data.title)
            setFirst(data.firstLine)

            if (data.content) {
              const t = data.content.split(',')
              const list = []

              t.map((item, index) => {
                list.push(item)
              })
              setInputLine(list)
            }
          } else {
          }
        })
    }
  }, [])

  if (currentInputRef.current) {
    currentInputRef.current.focus()
  } else {
  }

  document.onkeydown = event => {
    if (event && event.key === 'Enter') {
      console.log(1);
      const list = []
      const ele = document.createElement('input')
      nextLineRef.current = ele
      list.push(ele)
      setInputLine([...inputLine, list])
    }
  }

  // console.log(nextLineRef.current)
  // if (nextLineRef.current) nextLineRef.current.focus()

  return (
    <div>
      <TopTool>
        <InnerLeft>
          <LeftOutlined />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <DocsName>{title ? title : '未命名文档'}</DocsName>
              <HoverIcon>
                <Tooltip placement='bottom' title='收藏该文章'>
                  <StarOutlined onClick={handleFavorite} />
                </Tooltip>
              </HoverIcon>
            </div>
            <LatestTime>最近修改: 1min前</LatestTime>
          </div>
        </InnerLeft>
        <InnerLeft>
          <Popover
            placement='bottom'
            title='链接分享'
            content={content}
            trigger='click'
          >
            <Button
              type='primary'
              style={{
                borderRadius: '5px',
                marginRight: '20px'
              }}
            >
              分享
            </Button>
          </Popover>
          <Divider type='vertical' style={{ height: '30px' }} />
          <HoverIcon>
            <Tooltip placement='bottom' title='搜索文字'>
              <SearchOutlined style={ICON_STYLE} />
            </Tooltip>
          </HoverIcon>
          <HoverIcon>
            <Tooltip placement='bottom' title='新建文档'>
              <PlusOutlined style={ICON_STYLE} />
            </Tooltip>
          </HoverIcon>
          <UserInfo></UserInfo>
        </InnerLeft>
      </TopTool>
      <Main>
        <NavBar></NavBar>
        <Divider type='vertical' style={{ height: 'auto' }}></Divider>
        <Content ref={TextAreaRef}>
          <Input
            placeholder='请输入标题(文档名)'
            bordered={false}
            style={{ marginTop: '20px', minHeight: '30px', fontSize: '30px' }}
            onChange={changeTitle}
            value={title}
          />
          <Input
            placeholder='get started!!'
            bordered={false}
            style={{ marginTop: '20px', minHeight: '30px', fontSize: '18px' }}
            onChange={saveFirstLine}
            value={first}
          />
          {inputLine.map((item, index) => (
            <>
              <Popover
                placement='leftTop'
                title='样式'
                content={stylePopover}
                trigger='hover'
                key={index + item}
              >
                <DocsArea
                  key={item + index}
                  ref={currentInputRef}
                  style={currentStyle}
                  onChange={emitSave}
                  // value={item ? item : 'null'}
                />
              </Popover>
            </>
          ))}
        </Content>
      </Main>
    </div>
  )
}

export default CreateDocs
