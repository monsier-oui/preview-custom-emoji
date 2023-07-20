import { CheckIcon } from '@heroicons/react/24/outline';

const Checklist = () => (
  <ul className="space-y-2">
    {[
      {
        title:
          '著作権や肖像権はクリアしていますか？ 公式ロゴやグッズに似ていませんか？',
        content:
          '公式ロゴやキャラクターのイラストに酷似した図案はNGです。クリエイティブ・コモンズなど他者の著作物を利用する際はその旨申請時に記載してください。',
      },
      {
        title: '画像フォーマットはPNGまたはGIFですか？',
        content:
          'JPGやWEBPなどはNGです。また、アニメーションはGIFでお願いします。',
      },
      {
        title: 'ライトモード、ダークモードでも内容がわかりますか？',
        content:
          '色が明るいなら暗い色の、色が暗いなら明るい色のフチをつけてください。',
      },
      {
        title: 'MFMで拡大した際に汚くなったり、はみ出したりしませんか？',
        content:
          'あまりに横に長い絵文字はスマホなどで右側がはみ出すので、そうならないようご注意ください。',
      },
      {
        title: 'ファイル名は英数字とアンダースコアのみですか？',
        content:
          'そのままアップロードできるよう、絵文字名をファイル名にしていただけたら助かります。',
      },
      {
        title:
          'アニメーションが含まれる場合、1フレーム目だけで内容がわかりますか？',
        content:
          '設定からアニメーションを切っても内容がわかるよう、1フレーム目だけで内容がわかるようにしてください。',
      },
    ].map(({ title, content }, i) => (
      <li tabIndex={0} className="collapse bg-base-200" key={i}>
        <div className="collapse-title flex gap-2">
          <CheckIcon className="h-6 w-6 shrink-0" />
          {title}
        </div>
        <div className="collapse-content text-sm">
          <p>{content}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default Checklist;
