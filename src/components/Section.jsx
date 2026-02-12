const Section = ({ title, count, children, showCount = true, isNested = false }) => {
  return (
    <section className="space-y-4">
      {isNested ? (
        <div className="space-y-6">
          {children}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      )}
    </section>
  )
}

export default Section
