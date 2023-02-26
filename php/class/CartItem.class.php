<?php
class CartItem
{
    public $id;
    public $qtty;

    public function set_id($id) {
        $this->id = $id;
    }
    public function get_id($id) {
        return $this->id;
    }

    public function set_qtty($qtty) {
        $this->qtty = $qtty;
    }
    public function get_qtty($qtty) {
        return $this->qtty;
    }

}