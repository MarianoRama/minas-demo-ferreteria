import {
  IconoBulonera,
  IconoConstruccion,
  IconoElectricidad,
  IconoHerramientas,
  IconoJardin,
  IconoPinturas,
  IconoSanitaria,
  type IconoProps,
} from '../components/Iconos'
import type { RubroId } from './rubros'

export const ICONOS_RUBRO: Record<RubroId, (props: IconoProps) => React.JSX.Element> = {
  bulonera: IconoBulonera,
  electricidad: IconoElectricidad,
  sanitaria: IconoSanitaria,
  pinturas: IconoPinturas,
  herramientas: IconoHerramientas,
  jardin: IconoJardin,
  construccion: IconoConstruccion,
}
