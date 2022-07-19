import styled from 'styled-components'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

type ShortcutType = {
  shortcut: string[]
  $isHovered: boolean
}

export function Shortcut({ shortcut, $isHovered }: ShortcutType) {
  console.log(shortcut)
  const keys = shortcut.join('+').toUpperCase()

  return (
    <Span className='shortcut' $isHovered={$isHovered}>
      {keys
        .replaceAll('CONTROL', 'Ctrl')
        .replaceAll('ALT', 'Alt')
        .replaceAll('META', 'Meta')
        .replaceAll('SHIFT', 'Shift')
        .replaceAll('OPTION', 'Opt')
      }
    </Span>
  )
}

type PropsForSC = {
  $isHovered: boolean
}

const Span = styled.span<PropsForSC>`
  display: ${props => props.$isHovered ? 'block' : 'none'};
  position: absolute;
  right: 10px;
  top: -15px;
  font-size: 10px;
  font-weight: 300;
  color: #a5a4a4;
`
