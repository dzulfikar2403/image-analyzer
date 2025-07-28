"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type DropzoneInputImageProps = {
  fileImg: null | File; // getter
  setFileImg: (fileImg: File) => void; // setter
};

const DropzoneInputImage = ({
  fileImg,
  setFileImg,
}: DropzoneInputImageProps) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      maxSize: 1 * 1024 * 1024,
      accept: {
        "image/png": [],
      },
      multiple: false,
      onDrop: (accFile) => {
        setFileImg(accFile[0]);
      },
      onDropRejected: (fileRejections, event) => {
        fileRejections.map(el => {
          toast.error(el.file.path,{
            description: `${el.errors.map(el => el.code)}`
          });
        })
      },
    });

  return (
    <div className="my-2">
      <div
        className="border-2 border-dotted h-40 flex justify-center items-center"
        {...getRootProps()}
      >
        <div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <p className="text-lg font-semibold cursor-pointer">Drop Here</p>
            </>
          ) : (
            <>
              {/* display Image */}
              {fileImg ? (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Image
                      src={URL.createObjectURL(fileImg)}
                      alt="image display"
                      width={40}
                      height={40}
                      className="rounded shadow"
                    />
                    <p className="text-sm">
                      {fileImg.name} - {fileImg.size}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold cursor-pointer">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                  <em>
                    (1 files are the maximum number of files you can drop here)
                  </em>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropzoneInputImage;
