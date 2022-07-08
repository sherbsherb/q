import styled from 'styled-components'

type PropsForComponent = {
  reserveSpaceForIcon?: boolean
  text: string | React.ReactNode
}

type PropsForSC = {
  reserveSpaceForIcon?: boolean
}

/**
 * Component for text in menu item
 * @descriptions
 * - if we have nested menu some space should be left for 'go inside' icon
 * - if text is long it will be trimmed ellipsis (... dots)
 */
export function TextInMenu({ reserveSpaceForIcon, text }: PropsForComponent) {
  return (
    <Span reserveSpaceForIcon={reserveSpaceForIcon}>
      {text}
    </Span>
  )
}

const Span = styled.span<PropsForSC>`
  margin-left: 10px;
  margin-right: ${props => props.reserveSpaceForIcon ? '30px' : '0px'};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
