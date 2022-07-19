import styled from 'styled-components'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

type ShortcutType = {
  shortcut: string[]
  $isHovered: boolean
}

function capitalizeKey(keyStr: string) {
  return keyStr
    .toUpperCase()
    .replaceAll('CONTROL', 'Ctrl')
    .replaceAll('ALT', 'Alt')
    .replaceAll('META', 'Meta')
    .replaceAll('SHIFT', 'Shift')
    .replaceAll('OPTION', 'Opt')
    .replaceAll('TAB', 'Tab')
    .replaceAll('BACKSPACE', 'Backspace')
    .replaceAll('ENTER', 'Enter')
    .replaceAll('DELETE', 'Delete')
    .replaceAll('END', 'End')
    .replaceAll('HOME', 'Home')
    .replaceAll('PAGEDOWN', 'PageDown')
    .replaceAll('PAGEUP', 'PageUp')
    .replaceAll('CLEAR', 'Clear')
}

export function Shortcut({ shortcut, $isHovered }: ShortcutType) {
  const keys = shortcut.join('+').toUpperCase()

  return (
    <Span className='shortcut' $isHovered={$isHovered}>
      {capitalizeKey(keys)}
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
  top: 5px;
  font-size: 10px;
  font-weight: 300;
  color: #a5a4a4;
`
