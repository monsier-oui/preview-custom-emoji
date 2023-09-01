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
        content: '静止画はPNG、アニメーションはGIFが望ましいです。',
      },
      {
        title: 'ファイルサイズは大きすぎないですか？',
        content:
          'サーバーへの負荷軽減のため、50KB程度にしていただけたら助かります。大きすぎる場合は実装時にリサイズ、圧縮される場合があります。',
      },
      {
        title: 'ライトモード、ダークモードでも内容がわかりますか？',
        content:
          '明るい背景色でも暗い背景色でも見えるような色を使っていただくか、どうしても明るい色や暗い色にしたい場合はフチをつけてください。',
      },
      {
        title: 'MFMで拡大した際に汚くなったり、はみ出したりしませんか？',
        content:
          'あまりに横に長い絵文字はスマホなどで右側がはみ出します。最大でも10:1、MFMで拡大することを考えれば5:1を超えないようご注意ください。',
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
