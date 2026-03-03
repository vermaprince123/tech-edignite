"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  BookOpen,
  Filter,
  Download,
  ZoomIn,
} from "lucide-react";
import { examPapers, examPaperCategories, examTypes } from "@/lib/exam-papers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExamPapers() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPapers = examPapers.filter((paper) => {
    const categoryMatch = selectedCategory === "all" || paper.branch === selectedCategory;
    const typeMatch = selectedType === "all" || paper.examType === selectedType;
    return categoryMatch && typeMatch;
  });

  const selectedPaperData =
    selectedPaper !== null
      ? examPapers.find((p) => p.id === selectedPaper)
      : null;

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedPaperData) return;

    if (direction === "next") {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedPaperData.images.length
      );
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedPaperData.images.length) % selectedPaperData.images.length
      );
    }
  };

  return (
    <section className="py-24 md:py-32 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Exam Papers & Resources
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access previous year exam papers, quizzes, and assignments for all
            engineering branches
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {examPaperCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="capitalize"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {examTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                size="sm"
              >
                {type.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Exam Papers Grid */}
        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                        {paper.branch}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
                        {paper.examType}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{paper.subject}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{paper.year}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{paper.images.length} pages</span>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedPaper(paper.id);
                          setCurrentImageIndex(0);
                        }}
                        size="sm"
                      >
                        <ZoomIn className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">
              No exam papers found for the selected filters.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon or try different filters.
            </p>
          </motion.div>
        )}

        {/* Image Viewer Modal */}
        <AnimatePresence>
          {selectedPaper !== null && selectedPaperData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedPaper(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedPaperData.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{selectedPaperData.branch}</span>
                      <span>•</span>
                      <span>{selectedPaperData.subject}</span>
                      <span>•</span>
                      <span>{selectedPaperData.semester} Semester</span>
                      <span>•</span>
                      <span>{selectedPaperData.year}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPaper(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Image Display */}
                <div className="relative flex-1 min-h-0 bg-muted/50 overflow-auto">
                  {selectedPaperData.images[currentImageIndex] ? (
                    <div className="flex items-center justify-center min-h-full p-4">
                      <div className="relative max-w-full">
                        <Image
                          src={selectedPaperData.images[currentImageIndex]}
                          alt={`${selectedPaperData.title} - Page ${currentImageIndex + 1}`}
                          width={1200}
                          height={1600}
                          className="object-contain max-w-full h-auto"
                          style={{ maxHeight: 'calc(90vh - 200px)' }}
                          unoptimized
                          priority
                          onError={(e) => {
                            console.error("Image failed to load:", selectedPaperData.images[currentImageIndex]);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <FileText className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">Image not found</p>
                      <p className="text-sm">
                        Path: {selectedPaperData.images[currentImageIndex]}
                      </p>
                      <p className="text-xs mt-2 text-muted-foreground">
                        Please check if the image exists at this path in the public folder
                      </p>
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {selectedPaperData.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage("prev");
                        }}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage("next");
                        }}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t flex items-center justify-between flex-shrink-0">
                  <div className="text-sm text-muted-foreground">
                    Page {currentImageIndex + 1} of {selectedPaperData.images.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = selectedPaperData.images[currentImageIndex];
                        link.download = `${selectedPaperData.title}-page-${currentImageIndex + 1}.jpg`;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
