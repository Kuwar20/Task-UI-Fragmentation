const BurnStatsContainer = ({ statsSupplies, allSupplies, walletChain, tokenAddress, openChainModal }) => {
    return (
        <div className="top_bar">
            <AppIcon
                url="/images/token/App_new.svg"
                size={2}
                margin={0}
                fill={IconFilter.unset}
            />
            <p className="label">App SUPPLY</p>
            {/* Display chain information */}
            <AppChip
                onClick={openChainModal}
                title={walletChain?.name || "---"}
                endIcon={"/icons/expand_more.svg"}
                startIcon={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
            ></AppChip>
            <AppExtLink
                className=" supply_label"
                url={`${suppliesChain?.blockExplorers?.default?.url}/address/${tokenAddress}`}
            >
                View Contract
            </AppExtLink>
            {/* Display supply bar */}
            <div className="supply_bar">
                <AppIcon
                    url="/icons/fire.svg"
                    size={1.15}
                    margin={0}
                    fill={IconFilter.primary}
                />
                <AppIcon
                    url="/icons/double_arrow.svg"
                    size={1.15}
                    style={{
                        margin: "0 0 0 -0.8rem",
                    }}
                    fill={IconFilter.primary}
                />
                <span
                    className="line orange"
                    style={{ width: `${100 - statsSupplies.circulatingPercent}%` }}
                ></span>
                <span
                    className="line green"
                    style={{ width: `${statsSupplies.circulatingPercent}%` }}
                ></span>
            </div>
            {/* Display supply labels */}
            <div className="supply_label_list">
                <div>
                    <p className="supply_label">
                        <span className="hyphen orange"></span>
                        <span className="text">Burnt App Tokens</span>
                        <span className="percent orange">
                            {(100 - statsSupplies.circulatingPercent).toFixed(2)}%
                        </span>
                    </p>
                    {/* Display burnt token value */}
                    <p className="supply_value">
                        <AppIcon
                            size={1.25}
                            url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
                            fill={IconFilter.unset}
                            margin={0}
                        />
                        {numberWithCommas(
                            statsSupplies.totalSupply - statsSupplies.circulatingSupply
                        )}
                    </p>
                    {/* Display original token supply */}
                    <div className="full_supply">
                        Original App Token Initial Supply:
                        {numberWithCommas(statsSupplies.totalSupply)}
                    </div>
                </div>
                <div>
                    {/* Display circulating token information */}
                    <p className="supply_label">
                        <span className="hyphen green"></span>
                        <span className="text">Circulating App Tokens</span>
                        <span className="percent green">
                            {statsSupplies.circulatingPercent.toFixed(2)}%
                        </span>
                    </p>
                    <p className="supply_value">
                        <AppIcon
                            size={1.25}
                            url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
                            fill={IconFilter.unset}
                            margin={0}
                        />
                        {numberWithCommas(statsSupplies.circulatingSupply)}
                    </p>
                    {/* Display circulating token values for other chains */}
                    {allSupplies
                        .filter((s) => s.chainId != walletChain?.id)
                        .map((s: any) => (
                            <p key={s.chainId} className="supply_value mini">
                                <AppIcon
                                    size={1.25}
                                    url={`/images/token/${chainTokenSymbols.get(s.chainId) ?? "ETH"
                                        }.svg`}
                                    fill={IconFilter.unset}
                                    margin={0}
                                />
                                {numberWithCommas(s.circulatingSupply)}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
};
