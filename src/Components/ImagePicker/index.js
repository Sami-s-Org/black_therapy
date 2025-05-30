// import React, { useState, useEffect } from 'react'
// import { useFilePicker } from 'use-file-picker'
// import ImageUpload from 'assets/images/upload.png'
// import ImageFile from 'assets/images/file.png'
// import Style from './Imgpicker.module.css'
// import { uploadFile } from 'shared/services'
// import { RxUpload } from 'react-icons/rx'
// import { useTranslation } from 'react-i18next'

// interface ImgPickerProps {
//   setData?: any
//   className?: string
//   useImagePicker?: boolean
//   placeholder?: string
//   initialValue?: string
// }

// export default function ImgPicker({
//   className,
//   useImagePicker = true,
//   setData,
//   placeholder = 'Select files',
//   initialValue,
// }: ImgPickerProps) {
//   const { t }: any = useTranslation()

//   const [uploading, setUploading] = useState(false)
//   const [currentPlaceholder, setCurrentPlaceholder] = useState(initialValue || placeholder)
//   const { openFilePicker, filesContent, loading, errors } = useFilePicker({
//     readAs: 'DataURL',
//     multiple: true,
//     onFilesSelected: ({ plainFiles }) => {
//       // if (plainFiles.length > 0) {
//       //   setCurrentPlaceholder(plainFiles[0].name);
//       // }
//     },
//     onFilesRejected: ({ errors }) => {},
//     onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
//       uploadImage(plainFiles, filesContent)
//     },
//   })

//   const uploadImage = async (plainFiles: any, filesContent: any) => {
//     setUploading(true)
//     const data: any = new FormData()
//     const imagedata = plainFiles[0]
//     await data.append('file', imagedata)

//     uploadFile(data)
//       .then((res: any) => {
//         if (res.status === 200 && res.statusText === 'OK') {
//           setCurrentPlaceholder(plainFiles[0].name)
//           setData(res?.data?.fileUrl, plainFiles[0].name)
//         }
//       })
//       .catch((err: any) => {})
//       .finally(() => {
//         setUploading(false)
//       })
//   }

//   const handlePickerClick = () => {
//     openFilePicker()
//   }

//   const buttonImage = useImagePicker ? ImageUpload : ImageFile

//   useEffect(() => {
//     if (!initialValue) {
//       setCurrentPlaceholder(placeholder)
//     }
//   }, [placeholder])

//   return (
//     <div>
//       <div className={Style.border}>
//         {uploading ? (
//           <div>{t('loading')}</div>
//         ) : (
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               height: '48px',
//               width: '100%',
//             }}
//           >
//             {filesContent.map((file:any, index:any) => (
//               <div key={index} style={{ display: 'flex' }}>
//                 {file.type && file.type.startsWith('image/') && <img alt={file.name} src={file.content}></img>}
//                 {file.type && !file.type.startsWith('image/') && (
//                   <a href={file.content} download={file.name}>
//                     {t('download')} {file.name}
//                   </a>
//                 )}
//                 <br />
//               </div>
//             ))}
//             <div className={Style.flx}>
//               <div style={{ width: '80%', overflow: 'hidden' }}>
//                 <p
//                   style={{
//                     fontSize: '14px',
//                     textAlign: 'start',
//                     width: '80%',
//                     overflow: 'hidden',
//                     color: currentPlaceholder === placeholder ? '#7d7d7d' : '#7d7d7d',
//                   }}
//                 >
//                   {currentPlaceholder}
//                 </p>
//               </div>
//               <div style={{ width: '20%' }} className={Style.end}>
//                 <RxUpload className={Style.imge3} onClick={handlePickerClick} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
