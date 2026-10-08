function StatusLine({
  loading,
  error,
  shownCount,
  totalCount,
  source
}) {
  if (loading) {
    return (
      <p className="status" aria-live="polite">
        Đang tải...
      </p>
    );
  }

  return (
    <div className="status-row" aria-live="polite">
      <p className={error ? "status status-error" : "status"}>
        {error
          ? `Không tải được API: ${error}`
          : `Đang hiển thị ${shownCount} / ${totalCount} cuốn.`}
      </p>

      <p className="status status-source">
        Nguồn: {source}
      </p>
    </div>
  );
}

export default StatusLine;
