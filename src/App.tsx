import { clsx } from 'clsx';
import * as React from 'react';
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';

import './App.css';
import Alert from './components/Alert';
import type { AlertProps } from './components/Alert';
import Checklist from './components/Checklist';
import Reaction from './components/Reaction';
import Variants from './components/Variants';
import type { VariantsState } from './components/Variants';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [srcs, setSrcs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  useEffect(() => {
    if (!files) return;
    console.log(files);

    for (const file of files) {
      let error = false;
      console.log(file.name);

      if (!/^\w+\.(png|gif)$/.test(file.name)) {
        setAlerts((prevState) => [
          ...prevState,
          {
            type: 'error',
            text: `${file.name} - ファイル名に英数字とアンダースコア以外の文字が含まれているか、PNGまたはGIF以外の拡張子です。ファイル名を変更してください。`,
          },
        ]);
        error = true;
      }

      if (file.size > 1024 * 50) {
        setAlerts((prevState) => [
          ...prevState,
          {
            type: 'error',
            text: `${file.name} - ファイルサイズが50KBを超えています。画像を軽量化してください。`,
          },
        ]);
        error = true;
      }
      if (error) continue;

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
              setAlerts((prevState) => [
                ...prevState,
                {
                  type: 'error',
                  text: `${file.name} - アスペクト比が10:1を超えています。横幅を小さくしましょう。`,
                },
              ]);
              error = true;
            } else if (width / height > 5) {
              setAlerts((prevState) => [
                ...prevState,
                {
                  type: 'warning',
                  text: `${file.name} - アスペクト比が5:1を超えています`,
                },
              ]);
            }
          };
        }
        if (error) return;

        if (result && typeof result === 'string') {
          setSrcs((srcs) =>
            !srcs.includes(result) ? [...srcs, result] : srcs
          );
        }
      };
      reader.readAsDataURL(file);
    }
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

  const variants: { [key: string]: { title: string; items: string[] } } = {
    base: { title: '背景色', items: ['light', 'dark'] },
    size: { title: 'サイズ', items: ['x1', 'x2', 'x3', 'x4'] },
    screen: { title: '画面', items: ['sm', 'lg'] },
  };
  const [current, setCurrent] = useState<VariantsState>({
    base: variants.base.items[0],
    size: variants.size.items[0],
    screen: variants.screen.items[0],
  });

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
                {Object.keys(variants).map((key) => (
                  <React.Fragment key={key}>
                    <dt className="">{variants[key].title}</dt>
                    <dd>
                      <Variants
                        variants={variants[key].items}
                        value={current[key]}
                        variantsKey={key}
                        current={current}
                        setCurrentVariant={setCurrent}
                      />
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
              <div
                className={clsx(
                  'article',
                  `article-${current.base}`,
                  current.screen === 'sm' && 'max-w-xs'
                )}>
                <div
                  className={clsx(
                    current.size !== 'x1' && `mfm-${current.size}`
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
