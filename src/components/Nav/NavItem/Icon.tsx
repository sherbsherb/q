import { RoundSpanForIconStyled } from './RoundSpanForIconStyled'

type Props = {
  icon: string | React.ReactNode
}

/**
 * Component returns grey circle with an icon inside
 * @descriptions
 * - we may pass icon prop as an icon or a string
 * - if a sting passed we make it bold
 */
export function Icon({ icon }: Props) {
  return (
    <RoundSpanForIconStyled>
      {typeof icon === 'string' ? <span style={{ fontWeight: 600 }}>{icon}</span> : icon}
    </RoundSpanForIconStyled>
  )
}
