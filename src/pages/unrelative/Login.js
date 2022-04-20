import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import { Input } from 'antd'

const LoginWrapper = styled.canvas`
  width: 100%;
  height: 100%;
`

const Login = () => {
  const wrapperRef = useRef(null)
  //画一个五角星
  const drawFiveStar = (cxt, fiveStart) => {
    cxt.beginPath()
    var x = 0,
      y = 0
    for (var i = 0; i < 5; i++) {
      x = Math.cos(((18 + 72 * i - fiveStart.RotationAngle) / 180) * Math.PI)
      x = x * fiveStart.bigRadius + fiveStart.offsetX
      y = -Math.sin(((18 + 72 * i - fiveStart.RotationAngle) / 180) * Math.PI)
      y = y * fiveStart.bigRadius + fiveStart.offsetY
      cxt.lineTo(x, y)
      x = Math.cos(((54 + i * 72 - fiveStart.RotationAngle) / 180) * Math.PI)
      x = x * fiveStart.smallRadius + fiveStart.offsetX
      y = -Math.sin(((54 + i * 72 - fiveStart.RotationAngle) / 180) * Math.PI)
      y = y * fiveStart.smallRadius + fiveStart.offsetY
      cxt.lineTo(x, y)
    }
    cxt.closePath()
    cxt.lineWidth = 3
    cxt.strokeStyle = '#FD5'
    cxt.fillStyle = 'yellow'
    cxt.lineJoin = 'round'
    cxt.fill()
    cxt.stroke()
  }
  useEffect(() => {
    const wrapperContent = wrapperRef.current.getContext('2d')
    if (wrapperRef.current) {
      wrapperContent.fillStyle = 'white'
      wrapperContent.fillRect(
        0,
        0,
        wrapperRef.current.width,
        wrapperRef.current.height
      )
    }
    // 1s画一个小星星
    setInterval(() => {
      for (var i = 1; i <= 5; i++) {
        var fiveStart = {}
        fiveStart.bigRadius = Math.random() * 6 + 6
        fiveStart.smallRadius = fiveStart.bigRadius / 2.0
        fiveStart.offsetX = Math.random() * wrapperRef.current.width
        fiveStart.offsetY = Math.random() * wrapperRef.current.height
        fiveStart.RotationAngle = Math.random() * 360
        drawFiveStar(wrapperContent, fiveStart)
      }
    }, 1000)
    //每10s清空一次画布
    setInterval(() => {
      wrapperContent.clearRect(
        0,
        0,
        wrapperRef.current.width,
        wrapperRef.current.height
      )
    }, 10000)
  }, [])

  return (
    <LoginWrapper ref={wrapperRef}>
      <Input placeholder='输入名称'></Input>
      <Input></Input>
    </LoginWrapper>
  )
}

export default Login
