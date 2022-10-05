import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  ImageStyled,
  StyledAlert,
  StyledPaper,
  ThumbInnerStyled,
  ThumbsStyled,
  ThumbStyled,
  StyledContainer,
} from './FileUploadStyle';
import { LoadingProgress } from './LoadingProgress';
import { uploadImage } from './FileUploadLogic';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const fileValidator = (file) => {
  const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (Math.round(file.size / 1024) > 2048) {
    return {
      code: 'file-too-large',
      message: `Image is larger than 2MB`,
    };
  }

  if (!validFileTypes.some((type) => type === file.type)) {
    return {
      code: 'file-wrong-type',
      message: 'File type is not acceptable',
    };
  }

  return null;
};

const FileUpload = ({ setUploadUrl }) => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    validator: fileValidator,
  });

  const thumbs = files.map((file) => (
    <ThumbStyled key={file.name}>
      <ThumbInnerStyled>
        <ImageStyled src={file.preview} />
      </ThumbInnerStyled>
    </ThumbStyled>
  ));

  useEffect(() => {
    setUploadUrl(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (files.length !== 0) {
      uploadImage(files[0], setImageUrl, setProgress);
    }
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <StyledPaper>
      <StyledContainer
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <h2>Drag 'n' drop files</h2>
        <Divider variant={'middle'} textAlign={'center'} flexItem>
          <Chip label="Or" />
        </Divider>
        <Button variant={'contained'}>Browse files</Button>
      </StyledContainer>
      {progress !== 0 && progress !== 100 && (
        <LoadingProgress progress={progress} />
      )}
      {fileRejections.length > 0 && (
        <StyledAlert severity="error">
          {fileRejections[0].errors[0].message}
        </StyledAlert>
      )}
      <ThumbsStyled>{thumbs}</ThumbsStyled>
    </StyledPaper>
  );
};

export default FileUpload;
