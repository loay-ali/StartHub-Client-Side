export default function TokensInfo({tokensLeft}:{tokensLeft:number}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-text-secondary">Tokens</span>

      <span className="font-semibold text-primary">{tokensLeft}</span>
    </div>
  );
}
