import { Rings } from 'react-loader-spinner'
export default function RingLoader(props: any) {
  const { color, size } = props
  return <Rings visible={true} height={size} width={color} ariaLabel="ring-loading" wrapperStyle={{}} wrapperClass="" />
}
