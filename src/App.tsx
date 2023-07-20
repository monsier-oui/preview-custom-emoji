import { clsx } from 'clsx';
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';

import './App.css';
import Alert from './components/Alert';
import type { AlertProps } from './components/Alert';
import Checklist from './components/Checklist';
import Reaction from './components/Reaction';
import Variants from './components/Variants';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [srcs, setSrcs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  useEffect(() => {
    if (!files) return;

    files.forEach((file) => {
      let error = false;

      if (!/^\w+\.(png|gif)$/.test(file.name)) {
        setAlerts([
          ...alerts,
          {
            type: 'error',
            text: `${file.name} - ファイル名に英数字とアンダースコア以外の文字が含まれています。ファイル名を変更してください。`,
          },
        ]);
        error = true;
      }

      if (file.size > 1024 * 64) {
        setAlerts([
          ...alerts,
          {
            type: 'error',
            text: `${file.name} - ファイルサイズが64KBを超えています。画像を圧縮してください。`,
          },
        ]);
        error = true;
      } else if (file.size > 1024 * 50) {
        setAlerts([
          ...alerts,
          {
            type: 'warning',
            text: `${file.name} - ファイルサイズが50KBを超えています`,
          },
        ]);
      }
      if (error) return;

      const reader: FileReader | null = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (result) {
          const image = new Image();
          image.src = result.toString();
          image.onload = () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;

            if (width / height > 10) {
              setAlerts([
                ...alerts,
                {
                  type: 'warning',
                  text: `${file.name} - アスペクト比が10:1を超えています。横幅を小さくしましょう。`,
                },
              ]);
            }
          };
        }

        if (result && typeof result === 'string') {
          setSrcs((srcs) =>
            !srcs.includes(result) ? [...srcs, result] : srcs
          );
        }
      };
      reader.readAsDataURL(file);
    });
  }, [files]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const inputFiles = event.currentTarget.files
      ? [...Array.from(event.currentTarget.files)]
      : [];
    // console.dir(inputFiles);
    setFiles(inputFiles);
  };

  const variants = {
    base: ['light', 'dark'],
    size: ['x1', 'x2', 'x3', 'x4'],
    screen: ['sm', 'lg'],
  };
  const [currentBase, setCurrentBase] = useState<string>(variants.base[0]);
  const [currentSize, setCurrentSize] = useState<string>(variants.size[0]);
  const [currentScreen, setCurrentScreen] = useState<string>(
    variants.screen[0]
  );

  return (
    <>
      <div className="container my-5 md:my-10">
        <h1 className="text-xl font-bold md:text-3xl">
          カスタム絵文字プレビュー
        </h1>
        <div className="mt-5 md:mt-10">
          <input
            type="file"
            className="file-input w-full max-w-xs"
            accept="image/png,image/gif"
            multiple
            onChange={handleInputChange}
          />
          <small className="block">（複数選択可能です）</small>
          {alerts &&
            alerts.map(({ type, text }, i) => (
              <Alert type={type} text={text} key={i} />
            ))}
          {files && (
            <div className="mt-3 md:mt-6">
              <dl className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                <dt className="">背景色</dt>
                <dd>
                  <Variants
                    variants={variants.base}
                    value={currentBase}
                    setCurrentVariant={setCurrentBase}
                  />
                </dd>
                <dt className="">サイズ</dt>
                <dd>
                  <Variants
                    variants={variants.size}
                    value={currentSize}
                    setCurrentVariant={setCurrentSize}
                  />
                </dd>
                <dt className="">画面</dt>
                <dd>
                  <Variants
                    variants={variants.screen}
                    value={currentScreen}
                    setCurrentVariant={setCurrentScreen}
                  />
                </dd>
              </dl>
              <div
                className={clsx(
                  'article',
                  `article-${currentBase}`,
                  currentScreen === 'sm' && 'max-w-xs'
                )}>
                <div
                  className={clsx(
                    currentSize !== 'x1' && `mfm-${currentSize}`
                  )}>
                  {srcs?.length > 0 &&
                    srcs.map((src, i) => <img src={src} alt={`alt`} key={i} />)}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {srcs?.length > 0 &&
                    srcs.map((src, i) => <Reaction src={src} key={i} />)}
                </div>
              </div>
            </div>
          )}
        </div>
        <section className="mt-5 md:mt-10">
          <h1 className="mb-4 text-lg font-bold md:text-xl">チェックリスト</h1>
          <Checklist />
        </section>
      </div>
    </>
  );
}

export default App;
