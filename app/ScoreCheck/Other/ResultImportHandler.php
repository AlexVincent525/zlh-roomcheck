<?php

namespace App\ScoreCheck\Other;

class ResultImportHandler
{
    /**
     * Path to excel file
     *
     * @var mixed
     */
    protected $file;

    /**
     * ResultImportHandler constructor.
     * @param null $file mixed
     */
    public function __construct($file = null)
    {
        $this->file = $file;
    }

    /**
     * @param $file mixed
     */
    public function setFile($file)
    {
        $this->file = $file;
    }

    private function checkFilePath()
    {
        if ($this->file == null){
            throw new \Exception("File path can not be null");
        }
    }

    /**
     * Get the result collection
     *
     * @return array
     */
    public function getResult()
    {
        $this->checkFilePath();

        $reader = \Excel::selectSheetsByIndex(0)->load($this->file);

        return $reader->toArray();
    }
}