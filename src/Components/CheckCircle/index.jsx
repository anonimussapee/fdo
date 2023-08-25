const CheckCircle = ({checkAction, stateCheck}) => {
  
  return (
    <span  className={`img w-[25px] min-w-[25px] h-[25px] min-h-[25px] rounded-full border-[1px] border-[var(--Very-Light-Gray)]  ${stateCheck ? 'check-active' : 'bg-transparent'}  relative flex justify-center items-center`} onClick={checkAction || null}>
      <span className={`img w-[18px] h-[18px] rounded-full  ${stateCheck ? 'check-active-icon absolute' : 'none'} `}></span>
    </span>
  )
}

export {CheckCircle}